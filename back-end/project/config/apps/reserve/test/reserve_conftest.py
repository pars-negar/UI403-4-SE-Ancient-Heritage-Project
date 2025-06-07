import pytest
from datetime import date, timedelta
from apps.tour.models import Tour
from apps.reserve.models import RoomType, Reservation, ReservedRoom


@pytest.fixture
def tour(db):
    return Tour.objects.create(
        title="تور شیراز",
        start_date=date.today() + timedelta(days=7),
        end_date=date.today() + timedelta(days=10),
        base_price=1200000
    )


@pytest.fixture
def room_type(db, tour):
    return RoomType.objects.create(
        tour=tour,
        name="دو نفره",
        capacity=2,
        total=5,
        remaining=5,
        price_per_room=1800000
    )


@pytest.fixture
def reservation(db, tour):
    return Reservation.objects.create(
        tour=tour,
        full_price=1800000,
        is_paid=False,
        payment_date=None
    )


@pytest.fixture
def reserved_room(db, reservation, room_type):
    return ReservedRoom.objects.create(
        reservation=reservation,
        room_type=room_type,
        count=1
    )
