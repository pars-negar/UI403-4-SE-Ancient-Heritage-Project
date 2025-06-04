from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from apps.tour.models import Tour, Attraction
from apps.users.models import User
from apps.users.models import CustomUser as User


# -------------------------------
# تست ساخت تور جدید با احراز هویت
# -------------------------------
@pytest.mark.django_db
def test_create_tour_successfully():
    user = User.objects.create_user(
        phone_number="09120000000",
        password="testpass123",
        role="tour_manager",
        is_verified=True,
    )

    attraction = Attraction.objects.create(
        attraction_name="تخت جمشید",
        city="شیراز",
        historical_period="هخامنشی",
        description="یکی از مهم‌ترین جاذبه‌های تاریخی ایران"
    )

    client = APIClient()
    client.force_authenticate(user=user)

    payload = {
        "tour_name": "تور شیراز نوروزی",
        "origin": "تهران",
        "destination": "شیراز",
        "start_date": "2025-06-10",
        "end_date": "2025-06-15",
        "price": 2500000,
        "description": "سفر به شیراز و بازدید از اماکن تاریخی",
        "attractions": [attraction.id],
    }

    url = reverse("tour-create")
    response = client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert Tour.objects.count() == 1
    assert Tour.objects.first().tour_name == "تور شیراز نوروزی"


# -----------------------------------------
# تست فیلتر تورها با مبدا و مقصد و تاریخ
# -----------------------------------------
@pytest.mark.django_db
def test_search_tours_with_filters():
    Tour.objects.create(
        tour_name="تور بهاری",
        origin="تهران",
        destination="اصفهان",
        start_date="2025-06-01",
        end_date="2025-06-05",
        price=1500000,
        description="سفر به نصف جهان"
    )

    client = APIClient()
    url = reverse("toursearch")
    payload = {
        "origin": "تهران",
        "destination": "اصفهان",
        "start_date": "2025-06-01",
        "end_date": "2025-06-10",
    }

    response = client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["destination"] == "اصفهان"


# -------------------------------------------------------
# تست فیلتر جاذبه‌ها با نام، شهر یا دوره تاریخی مشخص
# -------------------------------------------------------
@pytest.mark.django_db
def test_search_attractions_by_name_city_period():
    Attraction.objects.create(
        attraction_name="نقش رستم",
        city="شیراز",
        historical_period="ساسانی",
        description="آرامگاه شاهان"
    )

    client = APIClient()
    url = reverse("attractionsearch")
    payload = {
        "name": "رستم",
        "city": "شیراز",
        "historical_period": "ساسانی"
    }

    response = client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert "نقش رستم" in response.data[0]["attraction_name"]


# -----------------------------------
# تست خطا در فیلتر تور با داده نادرست
# -----------------------------------
@pytest.mark.django_db
def test_search_tours_with_invalid_data():
    client = APIClient()
    url = reverse("toursearch")
    payload = {
        "start_date": "invalid-date"
    }

    response = client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ----------------------------------------------
# تست برگرداندن پیام 404 در صورت نبودن جاذبه
# ----------------------------------------------
@pytest.mark.django_db
def test_no_attractions_found():
    client = APIClient()
    url = reverse("attractionsearch")
    payload = {
        "name": "هیچ‌چیز",
        "city": "ناکجا",
        "historical_period": "خیالی"
    }

    response = client.post(url, payload, format="json")

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "message" in response.data
