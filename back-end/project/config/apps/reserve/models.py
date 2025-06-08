from django.db import models
import django_jalali.db.models as jmodels
from apps.users.models import CustomUser
from apps.tour.models import Tour

class RoomType(models.Model):
    tour = models.ForeignKey(Tour, verbose_name="تور", on_delete=models.CASCADE, related_name='room_types')
    name = models.CharField("نوع اتاق", max_length=50)
    capacity = models.PositiveIntegerField("ظرفیت")
    total = models.PositiveIntegerField("تعداد کل اتاق‌ها")
    remaining = models.PositiveIntegerField("تعداد باقی‌مانده")
    price_per_room = models.PositiveIntegerField("قیمت هر اتاق")

    def __str__(self):
        return f"{self.name} - {self.tour.tour_name}"

class Reservation(models.Model):
    tour = models.ForeignKey(Tour, verbose_name="تور", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, verbose_name="کاربر", on_delete=models.CASCADE)
    full_price = models.PositiveIntegerField("قیمت کل")
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.tour.tour_name}"

class Passenger(models.Model):
    reservation = models.ForeignKey(Reservation, verbose_name="رزرو", on_delete=models.CASCADE, related_name='passengers')
    first_name = models.CharField("نام", max_length=100, blank=True, null=True)
    last_name = models.CharField("نام خانوادگی", max_length=100, blank=True, null=True)
    national_id = models.CharField("کد ملی", max_length=10, blank=True, null=True)
    phone = models.CharField("شماره تلفن", max_length=11, blank=True, null=True)
    email = models.EmailField("ایمیل", blank=True, null=True)
    birth_date = models.DateField("تاریخ تولد", blank=True, null=True)
    payment_status = models.CharField(
        "وضعیت پرداخت",
        max_length=10,
        choices=[('paid', 'پرداخت شده'), ('unpaid', 'پرداخت نشده')],
        default='paid'
    )
    registration_date = jmodels.jDateField("تاریخ ثبت‌نام", auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.national_id}"

class ReservedRoom(models.Model):
    reservation = models.ForeignKey(Reservation, verbose_name="رزرو", on_delete=models.CASCADE, related_name='reserved_rooms')
    room_type = models.ForeignKey(RoomType, verbose_name="نوع اتاق", on_delete=models.CASCADE)
    count = models.PositiveIntegerField("تعداد رزرو شده")

    def __str__(self):
        return f"{self.room_type.name} x {self.count} - {self.reservation.tour.tour_name}"
