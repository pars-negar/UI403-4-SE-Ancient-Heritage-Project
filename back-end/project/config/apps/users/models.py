from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'کاربر عادی'),
        ('tour_manager', 'مسئول تور'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    phone_number = models.CharField(max_length=11, unique=True, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    email = models.EmailField(unique=False, blank=False, null=False) 


    def __str__(self):
        return self.username


class TourManagerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="tour_manager_profile")
    company_name = models.CharField(max_length=255) 
    company_address = models.TextField() 
    company_registration_number = models.CharField(max_length=255)  
    def __str__(self):
        return f"{self.user.username} - {self.company_name}"
