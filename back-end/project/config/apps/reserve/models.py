from django.db import models
import django_jalali.db.models as jmodels
from apps.users.models import CustomUser
from apps.tour.models import Tour  


class Booking(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    num_passengers = models.PositiveIntegerField()
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.tour.tour_name}"


class Passenger(models.Model):
    booking = models.ForeignKey("Booking", on_delete=models.CASCADE, related_name='passengers')
    full_name = models.CharField(max_length=255)
    national_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=11)
    
    payment_status = models.CharField(
        max_length=10,
        choices=[('paid', 'پرداخت شده'), ('unpaid', 'پرداخت نشده')],
        default='paid'
    )
    registration_date = jmodels.jDateField()

    def __str__(self):
        return f"{self.full_name} - {self.national_code}"
