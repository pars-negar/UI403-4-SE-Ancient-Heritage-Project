from django.contrib import admin
from .models import Booking, Passenger

# admin.site.register(Booking)
# admin.site.register(Passenger)


class PassengerInline(admin.TabularInline):
    model = Passenger
    extra = 0


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'tour', 'num_passengers', 'booking_date']
    list_filter = ['booking_date', 'tour']
    search_fields = ['user__username', 'tour__tour_name']
    inlines = [PassengerInline]


@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'national_code', 'phone_number', 'payment_status', 'registration_date', 'booking']
    list_filter = ['payment_status', 'registration_date']
    search_fields = ['full_name', 'national_code', 'phone_number']
