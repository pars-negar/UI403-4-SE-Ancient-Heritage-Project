from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('ایمیل باید وارد شود')
        role = extra_fields.get('role', 'user')
        if role not in dict(CustomUser.ROLE_CHOICES):
            raise ValueError('نقش نامعتبر است')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.full_clean()
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'user')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('سوپر یوزر باید is_staff=True باشد.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('سوپر یوزر باید is_superuser=True باشد.')

        return self.create_user(username, email, password, **extra_fields)
class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'کاربر عادی'),
        ('tour_manager', 'مسئول تور'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    phone_number = models.CharField(max_length=11, unique=True)
    is_verified = models.BooleanField(default=False)

    email = models.EmailField(
        unique=True,
        blank=False,
        null=False,
        error_messages={
            'unique': 'این ایمیل قبلاً ثبت شده است.',
            'invalid': 'لطفاً یک ایمیل معتبر وارد کنید.'
        }
    )
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    first_name_fa = models.CharField(max_length=100, blank=True, verbose_name='نام فارسی')
    last_name_fa = models.CharField(max_length=100, blank=True, verbose_name='نام خانوادگی فارسی')

    birth_date = models.DateField(blank=True, null=True, verbose_name='تاریخ تولد')
    national_code = models.CharField(max_length=10, blank=True, null=True, verbose_name='کد ملی')
    province = models.CharField(max_length=100, blank=True, null=True, verbose_name='استان')
    city = models.CharField(max_length=100, blank=True, null=True, verbose_name='شهر')

    

    objects = CustomUserManager()

    def clean(self):
        super().clean()
        if len(self.phone_number) != 11 or not self.phone_number.isdigit():
            raise ValidationError('شماره موبایل باید ۱۱ رقمی و فقط عدد باشد.')
        
        # اعتبارسنجی یکتایی ایمیل (به جز خود شیء فعلی در حالت ویرایش)
        if CustomUser.objects.exclude(pk=self.pk).filter(email=self.email).exists():
            raise ValidationError({'email': 'این ایمیل قبلاً ثبت شده است.'})
    def __str__(self):
        return self.username


class TourManagerProfile(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tour_manager_profile")
    company_name = models.CharField(max_length=255, blank=True, default='')
    company_address = models.TextField(blank=True, default='')
    company_registration_number = models.CharField(max_length=255, blank=True, default='')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    company_phone_number = models.CharField(max_length=11, blank=True, default='')
    first_name_fa = models.CharField(max_length=100, blank=True, verbose_name='نام فارسی')
    last_name_fa = models.CharField(max_length=100, blank=True, verbose_name='نام خانوادگی فارسی')



    def __str__(self):
        return f"{self.user.username} - {self.company_name}"


# سیگنال ساخت خودکار پروفایل مسئول تور
@receiver(post_save, sender=CustomUser)
def create_tour_manager_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'tour_manager':
        TourManagerProfile.objects.create(user=instance)
