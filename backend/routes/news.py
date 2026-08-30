from fastapi import APIRouter, Query
from services.news_service import get_items, find_active_alert

router = APIRouter(prefix="/api/veille", tags=["veille"])

CATEGORIES = {"all", "cyber", "rgpd", "it"}


@router.get("")
async def list_news(
    category: str = Query("all"),
    limit: int = Query(20, ge=1, le=40),
):
    items, fetched_at = await get_items()

    selected = category if category in CATEGORIES else "all"
    filtered = items if selected == "all" else [i for i in items if i["category"] == selected]

    def rank(item):
        # 1. alertes de sécurité, 2. avis concernant le parc de nos clients, 3. sources officielles
        if item["kind"] == "alerte":
            return 0
        if item["vendors"] and item["kind"] == "avis":
            return 1
        if item["official"]:
            return 2
        return 3

    filtered = sorted(filtered, key=rank)

    counts = {key: len([i for i in items if i["category"] == key]) for key in ("cyber", "rgpd", "it")}
    counts["all"] = len(items)

    return {
        "items": filtered[:limit],
        "counts": counts,
        "alert": find_active_alert(items),
        "updatedAt": fetched_at.isoformat() if fetched_at else None,
    }
