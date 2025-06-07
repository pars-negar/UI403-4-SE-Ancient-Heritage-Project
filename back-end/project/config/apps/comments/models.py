from django.db import models
from django.conf import settings
from apps.tour.models import Tour
from apps.users.models import CustomUser  
import django_jalali.db.models as jmodels
from django.db import models
from django.conf import settings

class SiteComment(models.Model):
    ROLE_CHOICES = (
        ('user', 'کاربر عادی'),
        ('tour_manager', 'مسئول تور'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, verbose_name="کاربر")
    user_role = models.CharField(max_length=20, choices=ROLE_CHOICES, editable=False, verbose_name="نقش کاربر در سایت")
    
    comment = models.TextField(verbose_name="متن نظر")
    rating = models.PositiveSmallIntegerField(default=5, verbose_name="امتیاز (از ۵)")
    created_at = jmodels.jDateField(auto_now_add=True, verbose_name="تاریخ ارسال")
    is_approved = models.BooleanField(default=False, verbose_name="آیا تأیید شده است؟")

    def save(self, *args, **kwargs):
        if self.user and not self.user_role:
            self.user_role = self.user.role
        super().save(*args, **kwargs)

    def __str__(self):
        name = self.user.username if self.user else "کاربر ناشناس"
        return f"نظر سایت از {name} ({self.get_user_role_display()})"
    

class TourComment(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(verbose_name="متن نظر")
    rating = models.PositiveSmallIntegerField(default=5, verbose_name="امتیاز از ۵")
    trip_date = jmodels.jDateField(null=True, blank=True, verbose_name="تاریخ سفر")
    created_at =jmodels.jDateField(auto_now_add=True, verbose_name="تاریخ ارسال")

    likes = models.PositiveIntegerField(default=0, verbose_name="تعداد لایک")
    dislikes = models.PositiveIntegerField(default=0, verbose_name="تعداد دیسلایک")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "tour comment"
        verbose_name_plural = "tour comments"

    def __str__(self):
        user_display = self.user.username if self.user else "کاربر ناشناس"
        return f"نظر توسط {user_display} برای {self.tour.tour_name}"
