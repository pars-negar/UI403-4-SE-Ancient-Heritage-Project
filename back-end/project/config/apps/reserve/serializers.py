from django.db.models import Q
from rest_framework import serializers
from .models import Tour, RoomType, Reservation, Passenger, ReservedRoom
import datetime
import re

class TourPassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['id', 'first_name', 'last_name', 'national_id', 'phone', 'email']

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

    def validate_email(self, value):
        if value:
            from django.core.validators import validate_email
            from django.core.exceptions import ValidationError
            try:
                validate_email(value)
            except ValidationError:
                raise serializers.ValidationError("فرمت ایمیل نامعتبر است.")
        return value

    def validate_birth_date(self, value):
        if value and value > datetime.date.today():
            raise serializers.ValidationError("تاریخ تولد نمی‌تواند در آینده باشد.")
        return value

    def validate_phone(self, value):
        if value:
            # فرض کنید شماره تلفن باید فقط ارقام داشته باشد و حداقل 8 رقم باشد (مثال)
            if not re.match(r'^\d{8,}$', value):
                raise serializers.ValidationError("شماره تلفن نامعتبر است.")
        return value

class ReservedRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedRoom
        fields = ['id', 'reservation', 'room_type', 'count']

    def validate_count(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("تعداد اتاق باید عددی مثبت باشد.")
        return value

    def validate(self, data):
        room_type = data.get('room_type')
        count = data.get('count')
        if room_type and count:
            if room_type.remaining < count:
                raise serializers.ValidationError(f"تعداد رزرو شده بیشتر از باقی‌مانده اتاق '{room_type.name}' است.")
        return data

class ReservationSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True)
    reserved_rooms = ReservedRoomSerializer(many=True)

    class Meta:
        model = Reservation
        fields = ['id', 'tour', 'user', 'full_price', 'created_at', 'passengers', 'reserved_rooms']
        read_only_fields = ['user', 'created_at']

    def validate_full_price(self, value):
        if value < 0:
            raise serializers.ValidationError("قیمت کل نمی‌تواند منفی باشد.")
        return value

    def validate(self, data):
        # چک کردن tour موجود بودن
        tour = data.get('tour')
        if not tour:
            raise serializers.ValidationError({"tour": "تور انتخاب شده معتبر نیست."})

        # چک کردن اتاق‌ها و تعداد رزرو
        reserved_rooms_data = self.initial_data.get('reserved_rooms', [])
        total_reserved_count = 0
        for item in reserved_rooms_data:
            if 'room_type' not in item or 'count' not in item:
                raise serializers.ValidationError("اطلاعات اتاق رزرو شده ناقص است.")
            # چک کردن room_type معتبر
            try:
                room_type = RoomType.objects.get(id=item['room_type'])
            except RoomType.DoesNotExist:
                raise serializers.ValidationError({"room_type": f"اتاق با شناسه {item['room_type']} وجود ندارد."})

            count = item['count']
            if count <= 0:
                raise serializers.ValidationError({"count": "تعداد اتاق باید مثبت باشد."})

            if room_type.tour != tour:
                raise serializers.ValidationError({"room_type": f"اتاق {room_type.name} متعلق به این تور نیست."})

            if room_type.remaining < count:
                raise serializers.ValidationError({"room_type": f"تعداد باقی‌مانده اتاق {room_type.name} کافی نیست."})

            total_reserved_count += count

        # جمع کل اتاق‌های باقی‌مانده در تور
        total_remaining = sum(rt.remaining for rt in tour.room_types.all())
        if total_reserved_count > total_remaining:
            raise serializers.ValidationError("تعداد کل اتاق‌های رزرو شده بیشتر از ظرفیت باقی‌مانده است.")

        # جلوگیری از رزرو همزمان برای کاربر
        user = self.context['request'].user
        overlapping = Reservation.objects.filter(
            user=user,
            tour__start_date__lt=tour.end_date,
            tour__end_date__gt=tour.start_date
        )
        if overlapping.exists():
            raise serializers.ValidationError("رزروی دیگری در این بازه زمانی دارید.")

        # چک کردن مسافران برای national_id تکراری
        passengers_data = data.get('passengers', [])
        national_ids = [p.get('national_id') for p in passengers_data if p.get('national_id')]
        if len(national_ids) != len(set(national_ids)):
            raise serializers.ValidationError("کد ملی مسافران نمی‌تواند تکراری باشد.")

        return data

    def create(self, validated_data):
        passengers_data = validated_data.pop('passengers')
        reserved_rooms_data = validated_data.pop('reserved_rooms')
        user = self.context['request'].user
        reservation = Reservation.objects.create(user=user, **validated_data)

        # ساخت مسافران
        for passenger_data in passengers_data:
            Passenger.objects.create(reservation=reservation, **passenger_data)

        # ساخت اتاق‌های رزرو شده و کم کردن ظرفیت remaining
        for room_data in reserved_rooms_data:
            room_type_id = room_data['room_type']
            count = room_data['count']

            room_type = RoomType.objects.get(id=room_type_id)
            if room_type.remaining < count:
                raise serializers.ValidationError(
                    f"تعداد اتاق‌های باقی‌مانده اتاق {room_type.name} کافی نیست."
                )
            room_type.remaining -= count
            room_type.save()

            ReservedRoom.objects.create(reservation=reservation, room_type=room_type, count=count)

        return reservation
