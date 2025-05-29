from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'کاربر عادی'),
        ('tour_manager', 'مسئول تور'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    phone_number = models.CharField(max_length=11, unique=True, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    email = models.EmailField(unique=True, blank=False, null=False)  # email یکتا شده

    def __str__(self):
        return self.username


class TourManagerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="tour_manager_profile")
    company_name = models.CharField(max_length=255) 
    company_address = models.TextField() 
    company_registration_number = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.username} - {self.company_name}"


# سیگنال برای ساخت خودکار پروفایل وقتی نقش user == tour_manager باشه
@receiver(post_save, sender=CustomUser)
def create_tour_manager_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'tour_manager':
        # چک می‌کنیم اگر پروفایلی نیست، بسازیم (ممکنه کد ثبت‌نام خودش ساخته باشه)
        if not hasattr(instance, 'tour_manager_profile'):
            TourManagerProfile.objects.create(
                user=instance,
                company_name='',
                company_address='',
                company_registration_number='',
            )















