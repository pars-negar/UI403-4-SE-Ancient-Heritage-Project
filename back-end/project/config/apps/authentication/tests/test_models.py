# apps/authentication/tests/test_models.py

from django.test import TestCase
from django.utils.timezone import now, timedelta
from django.contrib.auth import get_user_model
from apps.authentication.models import OTPCode

User = get_user_model()

class OTPCodeModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            phone_number='09121234567',
            password='securepassword123'
        )

    def test_otp_code_is_valid_within_time(self):
        otp = OTPCode.objects.create(user=self.user, code='123456')
        self.assertTrue(otp.is_valid())

    def test_otp_code_is_invalid_after_timeout(self):
        otp = OTPCode.objects.create(user=self.user, code='123456')
        otp.created_at = now() - timedelta(minutes=3)
        otp.save()
        self.assertFalse(otp.is_valid())
