from rest_framework import viewsets, permissions
from .models import Tour, RoomType, Reservation, Passenger, ReservedRoom
from .serializers import (
    TourSerializer, RoomTypeSerializer,
    ReservationSerializer, PassengerSerializer,
    ReservedRoomSerializer, TourPassengerSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class TourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]

class RoomTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    permission_classes = [permissions.AllowAny]

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # فقط رزروهای کاربر لاگین شده را نشان بده
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # کاربر لاگین شده را به رزرو اضافه کن
        serializer.save(user=self.request.user)

class PassengerViewSet(viewsets.ModelViewSet):
    serializer_class = PassengerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Passenger.objects.filter(reservation__user=user)


class ReservedRoomViewSet(viewsets.ModelViewSet):
    serializer_class = ReservedRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ReservedRoom.objects.filter(reservation__user=user)


class TourPassengerListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, tour_id):
        passengers = Passenger.objects.filter(reservation__tour_id=tour_id)
        serializer = TourPassengerSerializer(passengers, many=True)
        return Response(serializer.data)