from rest_framework import viewsets, permissions
from .models import Tour, RoomType, Reservation, Passenger, ReservedRoom
from .serializers import (
    TourSerializer, RoomTypeSerializer,
    ReservationSerializer, PassengerSerializer,
    ReservedRoomSerializer, PassengerSerializer,Tour
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import *
from rest_framework.permissions import *

class TourViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]

    queryset = Tour.objects.all()
    serializer_class = TourSerializer

class RoomTypeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]

    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsNormalUserOnly]

    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


    def get_queryset(self):
        # فقط رزروهای کاربر لاگین شده را نشان بده
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # کاربر لاگین شده را به رزرو اضافه کن
        serializer.save(user=self.request.user)

class PassengerViewSet(viewsets.ModelViewSet):
    serializer_class = PassengerSerializer
    permission_classes = [IsNormalUserOnly]

    def get_queryset(self):
        user = self.request.user
        return Passenger.objects.filter(reservation__user=user)


class ReservedRoomViewSet(viewsets.ModelViewSet):
    serializer_class = ReservedRoomSerializer
    permission_classes = [IsNormalUserOnly]


    def get_queryset(self):
        user = self.request.user
        return ReservedRoom.objects.filter(reservation__user=user)


class TourPassengerListAPIView(APIView):
    permission_classes = [IsTourManager | IsAdminUser]


    def get(self, request, tour_id):
        passengers = Passenger.objects.filter(reservation__tour_id=tour_id)
        serializer = TourPassengerSerializer(passengers, many=True)
        return Response(serializer.data)