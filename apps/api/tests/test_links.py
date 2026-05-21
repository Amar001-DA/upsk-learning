from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
def test_create_link():
    response = client.post(
        "/links/",
        json={"long_url": "https://example.com"}
    )

    assert response.status_code == 200

    data = response.json()

    assert "code" in data
    assert data["long_url"] == "https://example.com/"
def test_redirect_link():
    create_response = client.post(
        "/links/",
        json={"long_url": "https://example.com"}
    )

    code = create_response.json()["code"]

    redirect_response = client.get(
        f"/r/{code}",
        follow_redirects=False
    )

    assert redirect_response.status_code == 307

    assert (
        redirect_response.headers["location"]
        == "https://example.com/"
    )
