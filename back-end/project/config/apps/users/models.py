from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'کاربر عادی'),
        ('tour_manager', 'مسئول تور'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
