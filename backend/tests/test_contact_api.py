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
        "name": "T", "email": "bad", "subject": "s", "message": "m"
    })
    assert r.status_code == 422


def test_contact_invalid_turnstile_token(client):
    """Should return 4xx (not 500) when Turnstile token is invalid."""
    r = client.post(f"{BASE_URL}/api/contact", json={
        "name": "TEST_John",
        "email": "test@example.com",
        "subject": "Sujet test",
        "message": "Message de test",
        "turnstileToken": "invalid-token-xxx",
    })
    assert r.status_code < 500, f"Expected 4xx, got {r.status_code}: {r.text}"
    assert r.status_code in (400, 401, 403)


def test_contact_no_turnstile_token_accepted_or_400(client):
    """Backend currently allows missing token (logs warning) – must not 500."""
    r = client.post(f"{BASE_URL}/api/contact", json={
        "name": "TEST_John",
        "email": "test@example.com",
        "subject": "Sujet test",
        "message": "Message de test",
    })
    assert r.status_code < 500, f"Got {r.status_code}: {r.text}"


def test_no_mongo_dependency_in_startup():
    """Backend must start without Mongo - checked by health endpoint responding."""
    r = requests.get(f"{BASE_URL}/api/health", timeout=10)
    assert r.status_code == 200
