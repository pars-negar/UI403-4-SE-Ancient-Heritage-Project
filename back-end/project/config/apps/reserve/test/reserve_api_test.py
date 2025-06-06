import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from apps.users.models import CustomUser
from apps.tour.models import Tour
from apps.reserve.models import RoomType
from datetime import date, timedelta

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user(db):
    return CustomUser.objects.create_user(phone_number="09121234567", password="pass")

@pytest.fixture
def tour(db):
    return Tour.objects.create(
        title="تور شیراز",
        start_date=date.today() + timedelta(days=2),
        end_date=date.today() + timedelta(days=5),
        base_price=1000000,
    )

@pytest.fixture
def room_type(tour):
    return RoomType.objects.create(
        tour=tour,
        name="دو نفره",
        capacity=2,
        total=5,
        remaining=5,
        price_per_room=2000000,
    )

@pytest.fixture
def valid_payload(tour, room_type):
    return {
        "tour": tour.id,
        "full_price": 3000000,
        "rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ],
        "passengers": [
            {
                "full_name": "علی رضایی",
                "national_id": "1234567890",
                "birth_date": "2000-01-01",
                "email": "ali@example.com",
                "phone": "09121234567"
            }
        ]
    }

def test_invalid_tour_id(client, valid_payload):
    valid_payload["tour"] = 9999
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400
    assert "tour" in str(response.data)

def test_invalid_room_type_id(client, valid_payload):
    valid_payload["rooms"][0]["room_type"] = 9999
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_negative_full_price(client, valid_payload):
    valid_payload["full_price"] = -10000
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_duplicate_national_id(client, valid_payload):
    # دو مسافر با کد ملی یکسان
    p = valid_payload["passengers"][0]
    valid_payload["passengers"].append(p.copy())
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400
    assert "کد ملی تکراری" in str(response.data)

def test_invalid_email_format(client, valid_payload):
    valid_payload["passengers"][0]["email"] = "invalid-email"
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_future_birth_date(client, valid_payload):
    valid_payload["passengers"][0]["birth_date"] = "2999-01-01"
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_reserved_room_with_null_count(client, valid_payload):
    valid_payload["rooms"][0]["count"] = None
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_reserved_room_count_zero(client, valid_payload):
    valid_payload["rooms"][0]["count"] = 0
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_invalid_phone_number(client, valid_payload):
    valid_payload["passengers"][0]["phone"] = "123"
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_missing_passengers_field(client, valid_payload):
    del valid_payload["passengers"]
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 400

def test_successful_reservation(client, valid_payload):
    url = reverse("reserve_tour")
    response = client.post(url, valid_payload, format="json")
    assert response.status_code == 201
    assert "reservation_id" in response.data
