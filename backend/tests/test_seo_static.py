"""Tests for static SEO assets: sitemap.xml and robots.txt served via ingress."""
import os
import re
import xml.etree.ElementTree as ET

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


def test_robots_txt_served():
    r = requests.get(f"{BASE_URL}/robots.txt", timeout=15)
    assert r.status_code == 200
    assert "Sitemap:" in r.text
    assert "symplicity.fr/sitemap.xml" in r.text


def test_sitemap_xml_served():
    r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=15)
    assert r.status_code == 200
    # Parse XML
    root = ET.fromstring(r.text)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("s:url", ns)
    assert len(urls) == 11, f"expected 11 URLs, got {len(urls)}"
    for u in urls:
        loc = u.find("s:loc", ns).text
        lastmod = u.find("s:lastmod", ns)
        assert lastmod is not None and lastmod.text, f"lastmod missing for {loc}"


def test_sitemap_no_old_articles():
    r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=15)
    txt = r.text
    for slug in (
        "intelligence-artificielle-et-cybersecurite",
        "starware-it-services-devient-symplicity",
        "conformite-rgpd-en-essonne",
    ):
        assert slug not in txt, f"old slug {slug} still in sitemap"
