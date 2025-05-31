# apps/authentication/tests/test_api.py

from rest_framework.test import APITestCase
from django.urls import reverse
from django.core.cache import cache
from django.contrib.auth import get_user_model
from unittest.mock import patch

User = get_user_model()

class OTPAPITests(APITestCase):
    def setUp(self):
        self.send_otp_url = reverse('send-otp')
        self.verify_otp_url = reverse('verify-otp')
        self.phone_number = '09123456789'
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'phone_number': self.phone_number,
        }

    @patch('apps.authentication.views.requests.post')
    def test_send_otp_success(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {'isSuccess': True}

        response = self.client.post(self.send_otp_url, data=self.user_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('message', response.data)

    def test_send_otp_missing_phone(self):
        data = self.user_data.copy()
        data.pop('phone_number')
        response = self.client.post(self.send_otp_url, data=data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_verify_otp_success(self):
        otp_code = '123456'
        cache.set(self.phone_number, otp_code, timeout=120)
        cache.set(f'user_{self.phone_number}', self.user_data, timeout=600)

        response = self.client.post(self.verify_otp_url, data={
            'phone_number': self.phone_number,
            'otp_code': otp_code
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        user = User.objects.filter(phone_number=self.phone_number).first()
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.user_data['username'])

    def test_verify_otp_invalid_code(self):
        cache.set(self.phone_number, '999999', timeout=120)

        response = self.client.post(self.verify_otp_url, data={
            'phone_number': self.phone_number,
            'otp_code': '000000'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_verify_otp_expired_or_missing(self):
        response = self.client.post(self.verify_otp_url, data={
            'phone_number': self.phone_number,
            'otp_code': '123456'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_verify_otp_missing_fields(self):
        response = self.client.post(self.verify_otp_url, data={})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
