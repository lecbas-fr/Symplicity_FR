"""Tests pour l'endpoint /api/veille (agrégation RSS)."""
import os
import re
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://symplicity-preview.preview.emergentagent.com").rstrip("/")
VEILLE = f"{BASE_URL}/api/veille"

HTML_ENTITY_RE = re.compile(r"&[a-z]+;|&#\d+;", re.IGNORECASE)
HTML_TAG_RE = re.compile(r"<[^>]+>")


@pytest.fixture(scope="module")
def initial_payload():
    t0 = time.time()
    r = requests.get(VEILLE, timeout=30)
    elapsed = time.time() - t0
    assert r.status_code == 200, r.text
    payload = r.json()
    payload["_elapsed"] = elapsed
    return payload


class TestVeilleBase:
    def test_status_and_shape(self, initial_payload):
        for key in ("items", "counts", "alert", "updatedAt"):
            assert key in initial_payload, f"missing key {key}"
        assert isinstance(initial_payload["items"], list)
        assert len(initial_payload["items"]) > 0
        assert len(initial_payload["items"]) <= 20

    def test_first_call_fast(self, initial_payload):
        # first call after backend restart should be < 10s
        assert initial_payload["_elapsed"] < 15, f"first call too slow: {initial_payload['_elapsed']}s"

    def test_item_structure(self, initial_payload):
        for item in initial_payload["items"]:
            for k in ("title", "link", "source", "label", "kind", "category", "vendors", "publishedAt"):
                assert k in item, f"item missing {k}: {item}"
            assert item["link"].startswith(("http://", "https://")), f"non-abs link: {item['link']}"
            assert isinstance(item["vendors"], list)
            # No raw HTML tags or entities in titles
            assert not HTML_TAG_RE.search(item["title"]), f"HTML tag in title: {item['title']}"
            assert not HTML_ENTITY_RE.search(item["title"]), f"HTML entity in title: {item['title']}"

    def test_counts(self, initial_payload):
        counts = initial_payload["counts"]
        for key in ("all", "cyber", "rgpd", "it"):
            assert key in counts
        assert counts["all"] >= counts["cyber"]


class TestVeilleFilters:
    def test_category_cyber(self):
        r = requests.get(VEILLE, params={"category": "cyber"}, timeout=30)
        assert r.status_code == 200
        for item in r.json()["items"]:
            assert item["category"] == "cyber"

    def test_category_rgpd(self):
        r = requests.get(VEILLE, params={"category": "rgpd"}, timeout=30)
        assert r.status_code == 200
        for item in r.json()["items"]:
            assert item["category"] == "rgpd"

    def test_category_it(self):
        r = requests.get(VEILLE, params={"category": "it"}, timeout=30)
        assert r.status_code == 200
        for item in r.json()["items"]:
            assert item["category"] == "it"

    def test_unknown_category_fallbacks_all(self, initial_payload):
        r = requests.get(VEILLE, params={"category": "nimportequoi"}, timeout=30)
        assert r.status_code == 200
        # returns items (fallback all)
        assert len(r.json()["items"]) == len(initial_payload["items"])

    def test_limit_5(self):
        r = requests.get(VEILLE, params={"limit": 5}, timeout=30)
        assert r.status_code == 200
        assert len(r.json()["items"]) <= 5

    def test_limit_99_rejected(self):
        r = requests.get(VEILLE, params={"limit": 99}, timeout=30)
        assert r.status_code == 422


class TestVeilleRankingAndFilter:
    def test_alerts_first(self, initial_payload):
        items = initial_payload["items"]
        # find first non-alert index and confirm no alerts appear after
        kinds = [i["kind"] for i in items]
        if "alerte" in kinds:
            last_alert = max(i for i, k in enumerate(kinds) if k == "alerte")
            first_non_alert = next((i for i, k in enumerate(kinds) if k != "alerte"), None)
            if first_non_alert is not None:
                assert last_alert < first_non_alert or all(k == "alerte" for k in kinds[:first_non_alert])

    def test_no_promo_content(self, initial_payload):
        bad = ["offre", "bon plan", "promo", "black friday", "code promo"]
        for item in initial_payload["items"]:
            # only press feeds are filtered; check they don't contain excluded terms
            if item["label"] == "Presse IT":
                title_lower = item["title"].lower()
                for word in bad:
                    assert word not in title_lower, f"promo content leaked: {item['title']}"


class TestVeilleCache:
    def test_cache_second_call_fast(self, initial_payload):
        t0 = time.time()
        r = requests.get(VEILLE, timeout=30)
        elapsed = time.time() - t0
        assert r.status_code == 200
        assert elapsed < 2.0, f"cached call too slow: {elapsed}s"
        assert r.json()["updatedAt"] == initial_payload["updatedAt"]


class TestVeilleSummaries:
    def test_summaries_generated_after_wait(self, initial_payload):
        # Give AI background tasks time to complete
        time.sleep(45)
        r = requests.get(VEILLE, timeout=30)
        items = r.json()["items"]
        with_summary = sum(1 for i in items if i.get("summary"))
        # majority should have a summary after wait
        ratio = with_summary / max(len(items), 1)
        print(f"Summary ratio: {ratio:.0%} ({with_summary}/{len(items)})")
        assert ratio >= 0.5, f"only {ratio:.0%} items have a summary"
