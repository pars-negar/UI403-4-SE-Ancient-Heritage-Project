from django.db import models
from django.contrib.auth.models import AbstractUser
#در این قسمت دو نوع کاربر سیستم را مشخص کرده ایم
class Users(AbstractUser):
    Role_Choise=(
        ('tour_manager', 'مسئول تور')
        ('regular_user', 'کاربر عادی')
    )

# Create your models here.
