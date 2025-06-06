from django.db.models import Sum, Q
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

    def validate(self, data):
        room_type = data.get('room_type')
        count = data.get('count')

        # بررسی اینکه تعداد رزرو شده از باقی مانده اتاق بیشتر نباشد
        if room_type.remaining < count:
            raise serializers.ValidationError(f"تعداد رزرو شده بیشتر از تعداد باقی‌مانده اتاق '{room_type.name}' است.")
        return data

class ReservationSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True)
    reserved_rooms = ReservedRoomSerializer(many=True)

    class Meta:
        model = Reservation
        fields = ['id', 'tour', 'user', 'full_price', 'created_at', 'passengers', 'reserved_rooms']
        read_only_fields = ['user', 'created_at']

    def validate(self, data):
        tour = data.get('tour')
        reserved_rooms_data = self.initial_data.get('reserved_rooms', [])

        # محاسبه مجموع تعداد اتاق‌های رزرو شده (برای اطمینان از ظرفیت)
        total_reserved_count = sum(item.get('count', 0) for item in reserved_rooms_data)
        total_remaining = sum(rt.remaining for rt in tour.room_types.all())

        if total_reserved_count > total_remaining:
            raise serializers.ValidationError("تعداد اتاق‌های رزرو شده بیشتر از ظرفیت باقی‌مانده است.")

        # بررسی تداخل زمانی رزروهای قبلی کاربر
        user = self.context['request'].user
        overlapping = Reservation.objects.filter(
            user=user,
            tour__start_date__lt=tour.end_date,
            tour__end_date__gt=tour.start_date
        )
        if overlapping.exists():
            raise serializers.ValidationError("رزروی دیگری در این بازه زمانی دارید.")

        return data

    def create(self, validated_data):
        passengers_data = validated_data.pop('passengers')
        reserved_rooms_data = validated_data.pop('reserved_rooms')
        user = self.context['request'].user
        reservation = Reservation.objects.create(user=user, **validated_data)

        # ساخت مسافران مرتبط
        for passenger_data in passengers_data:
            Passenger.objects.create(reservation=reservation, **passenger_data)

        # ساخت اتاق‌های رزرو شده و کاهش تعداد remaining در RoomType
        for room_data in reserved_rooms_data:
            room_type = room_data['room_type']
            count = room_data['count']

            if room_type.remaining < count:
                raise serializers.ValidationError(
                    f"تعداد اتاق‌های باقی‌مانده اتاق {room_type.name} کافی نیست."
                )
            room_type.remaining -= count
            room_type.save()

            ReservedRoom.objects.create(reservation=reservation, **room_data)

        return reservation

