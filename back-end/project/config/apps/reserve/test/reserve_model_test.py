@pytest.mark.django_db
def test_invalid_tour_id(user, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    invalid_tour_id = 9999  # فرض بر اینکه وجود ندارد
    data = {
        "tour": invalid_tour_id,
        "full_price": 1000000,
        "passengers": [],
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "tour" in response.data


@pytest.mark.django_db
def test_invalid_room_type_id(user, tour):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": 1000000,
        "passengers": [],
        "reserved_rooms": [
            {
                "room_type": 9999,  # وجود ندارد
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "room_type" in str(response.data)


@pytest.mark.django_db
def test_negative_full_price(user, tour, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": -1000,
        "passengers": [],
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "full_price" in response.data


@pytest.mark.django_db
def test_duplicate_national_id(user, tour, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    passenger_data = {
        "first_name": "امیر",
        "last_name": "کریمی",
        "national_id": "1111111111",
        "payment_status": "paid"
    }

    data = {
        "tour": tour.id,
        "full_price": 1000000,
        "passengers": [passenger_data, passenger_data],  # تکراری
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "duplicate" in str(response.data).lower() or "تکراری" in str(response.data)


@pytest.mark.django_db
def test_invalid_email_format(user, tour, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": 1000000,
        "passengers": [
            {
                "first_name": "نازنین",
                "last_name": "امیری",
                "national_id": "1234567890",
                "email": "not-an-email",
                "payment_status": "paid"
            }
        ],
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "email" in response.data["passengers"][0]


@pytest.mark.django_db
def test_future_birth_date(user, tour, room_type):
    import datetime
    future_date = (datetime.date.today() + datetime.timedelta(days=10)).isoformat()

    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": 1000000,
        "passengers": [
            {
                "first_name": "آرمان",
                "last_name": "درویشی",
                "national_id": "1234567890",
                "birth_date": future_date,
                "payment_status": "paid"
            }
        ],
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "birth_date" in response.data["passengers"][0]


@pytest.mark.django_db
def test_reserved_room_with_null_count(user, tour, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": 1000000,
        "passengers": [],
        "reserved_rooms": [
            {
                "room_type": room_type.id
                # count is missing
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "count" in str(response.data)


@pytest.mark.django_db
def test_invalid_phone_number(user, tour, room_type):
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('reservation-list')

    data = {
        "tour": tour.id,
        "full_price": 2000000,
        "passengers": [
            {
                "first_name": "رضا",
                "last_name": "سجادی",
                "national_id": "1234567890",
                "phone": "1234abc",
                "payment_status": "paid"
            }
        ],
        "reserved_rooms": [
            {
                "room_type": room_type.id,
                "count": 1
            }
        ]
    }

    response = client.post(url, data, format='json')
    assert response.status_code == 400
    assert "phone" in response.data["passengers"][0]
