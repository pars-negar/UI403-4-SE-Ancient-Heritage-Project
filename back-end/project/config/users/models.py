from django.db import models
from django.contrib.auth.models import AbstractUser
#در این قسمت دو نوع کاربر سیستم را مشخص کرده ایم
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class projectusers(AbstractUser):
    ROLE_CHOICES = [
        ('tour_manager', 'مسئول تور'),
        ('regular_user', 'کاربر عادی'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='regular_user')
    groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)
  

# Create your models here.
