"""Agrégation de flux RSS (veille cybersécurité / RGPD / IT) avec cache mémoire."""
import asyncio
import logging
import os
import re
import threading
from datetime import datetime, timezone, timedelta
from html import unescape

import feedparser
import httpx

logger = logging.getLogger(__name__)

CACHE_TTL_SECONDS = 1800
MAX_ITEMS = 40
SUMMARY_LIMIT = 40
AI_MODEL = "claude-haiku-4-5-20251001"

FEEDS = [
    {"id": "cert-alerte", "name": "CERT-FR", "label": "Alerte", "kind": "alerte",
     "url": "https://www.cert.ssi.gouv.fr/alerte/feed/", "category": "cyber", "official": True},
    {"id": "cert-avis", "name": "CERT-FR", "label": "Avis de sécurité", "kind": "avis",
     "url": "https://www.cert.ssi.gouv.fr/avis/feed/", "category": "cyber", "official": True},
    {"id": "cert-actu", "name": "CERT-FR", "label": "Bulletin d'actualité", "kind": "bulletin",
     "url": "https://www.cert.ssi.gouv.fr/actualite/feed/", "category": "cyber", "official": True},
    {"id": "cnil", "name": "CNIL", "label": "CNIL", "kind": "info",
     "url": "https://www.cnil.fr/fr/rss.xml", "category": "rgpd", "official": True},
    {"id": "eset", "name": "ESET — WeLiveSecurity", "label": "Éditeur", "kind": "info",
     "url": "https://www.welivesecurity.com/fr/rss/feed/", "category": "cyber", "official": False},
    {"id": "it-connect", "name": "IT-Connect", "label": "Presse IT", "kind": "info",
     "url": "https://www.it-connect.fr/feed/", "category": "it", "official": False, "filter": True},
    {"id": "undernews", "name": "UnderNews", "label": "Presse IT", "kind": "info",
     "url": "https://www.undernews.fr/feed", "category": "cyber", "official": False, "filter": True},
    {"id": "zataz", "name": "ZATAZ", "label": "Presse IT", "kind": "info",
     "url": "https://www.zataz.com/feed/", "category": "cyber", "official": False, "filter": True},
]

RGPD_KEYWORDS = ["rgpd", "gdpr", "données personnelles", "donnees personnelles", "cnil", "dpo",
                 "vie privée", "vie privee", "privacy", "consentement", "conformité", "conformite",
                 "protection des données", "protection des donnees"]

CYBER_KEYWORDS = ["cyber", "ransomware", "rançongiciel", "rancongiciel", "faille", "vulnérabilit",
                  "vulnerabilit", "malware", "phishing", "hameçonnage", "hameconnage", "attaque",
                  "sécurité", "securite", "exploit", "cve-", "zero-day", "0-day", "intrusion",
                  "virus", "botnet", "fuite de données", "fuite de donnees", "piratage", "hacker",
                  "espionnage", "backdoor", "chiffrement"]

IT_KEYWORDS = ["cloud", "infogérance", "infogerance", "windows", "microsoft", "serveur", "sauvegarde",
               "backup", "réseau", "reseau", "virtualisation", "vmware", "licence", "intelligence artificielle",
               "office 365", "azure", "vpn", "wi-fi", "poste de travail", "datacenter", "linux"]

# Contenus commerciaux / tests matériel écartés des flux presse
EXCLUDE_KEYWORDS = ["offre", "bon plan", "promo", "réduction", "reduction", "concours", "black friday",
                    "code promo", "soldes", "€", "test :", "test ", "comparatif", "meilleur"]

# Solutions déployées par Symplicity chez ses clients
VENDORS = {
    "Sophos": ["sophos"],
    "Bitdefender": ["bitdefender"],
    "Microsoft": ["microsoft", "windows", "office 365", "microsoft 365", "azure", "exchange", "outlook"],
    "Acronis": ["acronis"],
    "Vade Secure": ["vade secure", "vadesecure"],
    "HP": ["hewlett-packard", " hp "],
    "Veeam": ["veeam"],
}

_cache = {"items": [], "fetched_at": None}
_summaries = {}
_lock = asyncio.Lock()


def _clean(text, limit=260):
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(unescape(text)).replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit].rstrip() + ("…" if len(text) > limit else "")


def _parse_date(entry):
    for key in ("published_parsed", "updated_parsed"):
        value = entry.get(key)
        if value:
            return datetime(*value[:6], tzinfo=timezone.utc)
    return None


def _categorize(text, default):
    lowered = text.lower()
    if any(word in lowered for word in RGPD_KEYWORDS):
        return "rgpd"
    if any(word in lowered for word in CYBER_KEYWORDS):
        return "cyber"
    if any(word in lowered for word in IT_KEYWORDS):
        return "it"
    return default


def _is_relevant(text):
    lowered = text.lower()
    return any(word in lowered for word in RGPD_KEYWORDS + CYBER_KEYWORDS + IT_KEYWORDS)


def _match_vendors(text):
    lowered = f" {text.lower()} "
    return [vendor for vendor, needles in VENDORS.items() if any(n in lowered for n in needles)]


async def _fetch_feed(client, feed):
    try:
        response = await client.get(feed["url"], timeout=8.0)
        response.raise_for_status()
        parsed = feedparser.parse(response.content)
    except Exception as exc:
        logger.warning(f"Flux indisponible ({feed['id']}): {exc}")
        return []

    items = []
    for entry in parsed.entries[:15]:
        title = _clean(entry.get("title", ""), 200)
        link = entry.get("link", "")
        if not title or not link:
            continue

        excerpt = _clean(entry.get("summary", ""))
        haystack = f"{title} {excerpt}"

        if feed.get("filter"):
            if not _is_relevant(haystack):
                continue
            if any(word in title.lower() for word in EXCLUDE_KEYWORDS):
                continue

        published = _parse_date(entry)
        items.append({
            "id": link,
            "title": title,
            "link": link,
            "excerpt": excerpt,
            "source": feed["name"],
            "sourceId": feed["id"],
            "label": feed["label"],
            "kind": feed["kind"],
            "official": feed["official"],
            "category": _categorize(haystack, feed["category"]),
            "vendors": _match_vendors(haystack),
            "publishedAt": published.isoformat() if published else None,
            "_sort": published or datetime(1970, 1, 1, tzinfo=timezone.utc),
        })
    return items


async def _summarize(item, semaphore):
    if item["link"] in _summaries:
        item["summary"] = _summaries[item["link"]]
        return

    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        return

    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        async with semaphore:
            chat = LlmChat(
                api_key=api_key,
                session_id=f"veille-{abs(hash(item['link']))}",
                system_message=(
                    "Tu es analyste chez Symplicity, société française d'infogérance, de RGPD et de "
                    "cybersécurité. Résume l'actualité en UNE seule phrase en français, factuelle et "
                    "professionnelle, 25 mots maximum. Pas de guillemets, pas d'introduction, pas de "
                    "formule du type « cet article ». Va droit au fait."
                ),
            ).with_model("anthropic", AI_MODEL)

            response = await chat.send_message(
                UserMessage(text=f"Titre : {item['title']}\nExtrait : {item['excerpt']}")
            )

        summary = _clean(str(response), 240)
        if summary:
            _summaries[item["link"]] = summary
            item["summary"] = summary
    except Exception as exc:
        logger.warning(f"Résumé IA indisponible: {exc}")


async def _summarize_all(items):
    """Génère les résumés IA (les visiteurs voient l'extrait en attendant)."""
    semaphore = asyncio.Semaphore(4)
    await asyncio.gather(*[_summarize(item, semaphore) for item in items[:SUMMARY_LIMIT]])
    if len(_summaries) > 400:
        _summaries.clear()


def _start_summaries(items):
    """Exécuté dans un thread dédié : le client LLM ne bloque pas la boucle de l'API."""
    def runner():
        try:
            asyncio.run(_summarize_all(items))
        except Exception as exc:
            logger.warning(f"Résumés IA interrompus: {exc}")

    threading.Thread(target=runner, daemon=True).start()


async def _refresh():
    headers = {"User-Agent": "Mozilla/5.0 (compatible; SymplicityVeille/1.0)"}
    async with httpx.AsyncClient(headers=headers, follow_redirects=True) as client:
        results = await asyncio.gather(*[_fetch_feed(client, feed) for feed in FEEDS])

    seen = set()
    items = []
    for group in results:
        for item in group:
            if item["link"] in seen:
                continue
            seen.add(item["link"])
            items.append(item)

    items.sort(key=lambda entry: entry["_sort"], reverse=True)
    items = items[:MAX_ITEMS]

    for item in items:
        item.pop("_sort", None)
        if item["link"] in _summaries:
            item["summary"] = _summaries[item["link"]]

    _cache["items"] = items
    _cache["fetched_at"] = datetime.now(timezone.utc)

    _start_summaries(items)
    return items


async def get_items(force=False):
    fetched_at = _cache["fetched_at"]
    is_stale = (
        force
        or fetched_at is None
        or (datetime.now(timezone.utc) - fetched_at).total_seconds() > CACHE_TTL_SECONDS
    )

    if not is_stale:
        return _cache["items"], fetched_at

    # Cache périmé mais utilisable : on sert l'ancien contenu et on rafraîchit en tâche de fond
    if _cache["items"] and not _lock.locked():
        asyncio.create_task(_refresh_guarded())
        return _cache["items"], fetched_at

    if not _cache["items"]:
        await _refresh_guarded()

    return _cache["items"], _cache["fetched_at"]


async def _refresh_guarded():
    if _lock.locked():
        return
    async with _lock:
        try:
            await _refresh()
        except Exception as exc:
            logger.error(f"Échec du rafraîchissement de la veille: {exc}")


def find_active_alert(items, days=7):
    threshold = datetime.now(timezone.utc) - timedelta(days=days)
    for item in items:
        if item["kind"] != "alerte" or not item["publishedAt"]:
            continue
        try:
            published = datetime.fromisoformat(item["publishedAt"])
        except ValueError:
            continue
        if published >= threshold:
            return item
    return None
