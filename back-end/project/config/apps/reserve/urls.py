from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TourViewSet, RoomTypeViewSet, ReservationViewSet, PassengerViewSet, ReservedRoomViewSet,TourPassengerListAPIView

router = DefaultRouter()
router.register(r'tours', TourViewSet, basename='tour')
router.register(r'room-types', RoomTypeViewSet, basename='roomtype')
router.register(r'reservations', ReservationViewSet, basename='reservation')
router.register(r'passengers', PassengerViewSet, basename='passenger')
router.register(r'reserved-rooms', ReservedRoomViewSet, basename='reservedroom')

urlpatterns = [
    path('', include(router.urls)),
    path('tours/<int:tour_id>/passengers/', TourPassengerListAPIView.as_view(), name='tour-passengers'),
]
