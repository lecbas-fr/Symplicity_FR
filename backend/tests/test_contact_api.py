"""Backend tests for Symplicity contact API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break
BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health & basic
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_health(client):
    r = client.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    assert r.json().get("status") == "healthy"


# Contact endpoint validation
def test_contact_missing_fields(client):
    r = client.post(f"{BASE_URL}/api/contact", json={})
    assert r.status_code == 422  # pydantic validation error


def test_contact_invalid_email(client):
    r = client.post(f"{BASE_URL}/api/contact", json={
        "firstName": "T", "lastName": "D", "email": "bad", "message": "m"
    })
    assert r.status_code == 422


def test_contact_invalid_turnstile_token(client):
    """Should return 4xx (not 500) when Turnstile token is invalid."""
    r = client.post(f"{BASE_URL}/api/contact", json={
        "firstName": "TEST_John", "lastName": "Doe", "position": "DSI",
        "email": "test@example.com",
        
        "message": "Message de test",
        "turnstileToken": "invalid-token-xxx",
    })
    assert r.status_code < 500, f"Expected 4xx, got {r.status_code}: {r.text}"
    assert r.status_code in (400, 401, 403)


def test_contact_no_turnstile_token_returns_400(client):
    """When TURNSTILE_SECRET_KEY is configured, missing token must be rejected with 400 (not 500)."""
    r = client.post(f"{BASE_URL}/api/contact", json={
        "firstName": "TEST_John", "lastName": "Doe", "position": "DSI",
        "email": "test@example.com",
        "message": "Message de test",
    })
    assert r.status_code < 500, f"Got {r.status_code}: {r.text}"
    assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"


def test_sitemap_xml(client):
    r = client.get(f"{BASE_URL}/sitemap.xml")
    assert r.status_code == 200
    body = r.text
    assert "<urlset" in body
    for path in [
        "/", "/rgpd", "/cybersecurite", "/infogerance", "/actualites",
        "/actualites/intelligence-artificielle-et-cybersecurite",
        "/actualites/starware-it-services-devient-symplicity",
        "/actualites/conformite-rgpd-en-essonne",
        "/contact", "/qui-sommes-nous", "/nos-engagements",
        "/mentions-legales", "/politique-de-confidentialite", "/rgpd-vos-donnees"
    ]:
        assert path in body, f"Missing {path} in sitemap"


def test_robots_txt(client):
    r = client.get(f"{BASE_URL}/robots.txt")
    assert r.status_code == 200
    assert "Sitemap:" in r.text


def test_no_mongo_dependency_in_startup():
    """Backend must start without Mongo - checked by health endpoint responding."""
    r = requests.get(f"{BASE_URL}/api/health", timeout=10)
    assert r.status_code == 200
