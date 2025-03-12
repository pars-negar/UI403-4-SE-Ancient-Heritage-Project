from django.db import models
from django.contrib.auth import  get_user_model

import random

User = get_user_model()

class OTPCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='otp_code')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_valid(self):
        from django.utils.timezone import now
        return (now() - self.created_at).seconds < 120