from django.db import models
from django.conf import settings

class SiteComment(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('tour_manager', 'Tour Manager'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    comment = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    # ذخیره نقش موقع ساخت، برای فیلتر سریع‌تر و خوانایی بهتر
    user_role = models.CharField(max_length=20, choices=ROLE_CHOICES, editable=False)

    def save(self, *args, **kwargs):
        if self.user and not self.user_role:
            self.user_role = self.user.role
        super().save(*args, **kwargs)

    def __str__(self):
        return f"SiteComment by {self.user.username} ({self.user_role})"
