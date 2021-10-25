from fastapi.testclient import TestClient

from erre2.main import app

client = TestClient(app)


def login(username, password):
    response = client.post("/token", data={"username": username, "password": password})
    assert response.status_code == 200
    return response.json()


def test_connect():
    response = client.get("/")
    assert response.status_code == 200


def test_me():
    token = login("admin@admin.com", "password")
    response = client.get("users/me", headers={"Authorization": "Bearer " + token["access_token"]})
    assert response.status_code == 200


def test_create_user():
    token = login("admin@admin.com", "password")
    response = client.post("users/", headers={"Authorization": "Bearer " + token["access_token"]},
                           json={"name": "sgozzoli", "surname": "caione", "email": "pippo@paperino.it",
                                 "password": "password"})
    assert response.status_code == 200


def test_unauthorized_create():
    token = login("pippo@paperino.it", "password")
    response = client.post("users/", headers={"Authorization": "Bearer " + token["access_token"]},
                           json={"name": "sgozzoli", "surname": "caione", "email": "pippo@paperino.it",
                                 "password": "password"})
    assert response.status_code == 403
