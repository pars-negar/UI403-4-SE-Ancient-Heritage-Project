from rest_framework import serializers
from .models import Tour, RoomType, Reservation, Passenger, ReservedRoom

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'title', 'start_date', 'base_price']

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['id', 'tour', 'name', 'capacity', 'total', 'remaining', 'price_per_room']

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = [
            'id', 'reservation', 'first_name', 'last_name', 'national_id',
            'phone', 'email', 'birth_date', 'payment_status', 'registration_date'
        ]

class ReservedRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedRoom
        fields = ['id', 'reservation', 'room_type', 'count']

class ReservationSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True, read_only=True)
    reserved_rooms = ReservedRoomSerializer(many=True, read_only=True)
    
    class Meta:
        model = Reservation
        fields = ['id', 'tour', 'user', 'full_price', 'created_at', 'passengers', 'reserved_rooms']

class TourPassengerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Passenger
        fields = ['id', 'full_name', 'national_id', 'phone', 'payment_status', 'registration_date']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
