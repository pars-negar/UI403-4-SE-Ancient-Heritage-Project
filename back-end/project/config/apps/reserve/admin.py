from django.contrib import admin
from .models import Reservation, Passenger, ReservedRoom

class PassengerInline(admin.TabularInline):
    model = Passenger
    extra = 0

class ReservedRoomInline(admin.TabularInline):
    model = ReservedRoom
    extra = 0

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['user', 'tour', 'full_price', 'created_at']
    list_filter = ['created_at', 'tour']
    search_fields = ['user__username', 'tour__title']
    inlines = [PassengerInline, ReservedRoomInline]

@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'national_id', 'phone', 'payment_status', 'registration_date', 'reservation']
    list_filter = ['payment_status', 'registration_date']
    search_fields = ['first_name', 'last_name', 'national_id', 'phone']

@admin.register(ReservedRoom)
class ReservedRoomAdmin(admin.ModelAdmin):
    list_display = ['reservation', 'room_type', 'count']
    list_filter = ['room_type']
    search_fields = ['reservation__user__username', 'room_type__name']
