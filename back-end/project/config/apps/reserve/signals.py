# reservation/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reservation
from .utils import send_sms

@receiver(post_save, sender=Reservation)
def send_sms_on_reservation(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        phone = "09160911736" # یا mobile یا هر چیزی که فیلد شماره کاربر هست در CustomUser

        tour_title = instance.tour.tour_name
        message = f"رزرو تور «{tour_title}» با موفقیت انجام شد. با تشکر از شما."

        send_sms(phone, message)
