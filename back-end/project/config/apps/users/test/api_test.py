import pytest
from rest_framework.exceptions import ValidationError
from apps.users.serializers import (
    UserRegisterSerializer,
    TourRegisterSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.translation import activate

User = get_user_model()

@pytest.mark.django_db
class TestUserSerializers:
    activate('fa')

    def test_user_register_serializer_valid(self):
        data = {
            "username": "testuser",
            "password": "StrongPass1!",
            "email": "testuser@example.com",
            "phone_number": "09123456789",
        }
        serializer = UserRegisterSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        user = serializer.save()
        assert user.username == data["username"]
        assert user.role == "user"
        assert User.objects.filter(username="testuser").exists()

    def test_user_register_serializer_invalid_phone(self):
        data = {
            "username": "user2",
            "password": "StrongPass1!",
            "email": "user2@example.com",
            "phone_number": "9123456789",
        }
        serializer = UserRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert "شماره تلفن باید 11 رقمی باشد." in serializer.errors["phone_number"]

    def test_user_register_serializer_duplicate_email(self):
        User.objects.create_user(
            username="existinguser",
            email="exist@example.com",
            phone_number="09121111111",
            password="StrongPass1!"
        )
        data = {
            "username": "newuser",
            "password": "StrongPass1!",
            "email": "exist@example.com",
            "phone_number": "09122222222",
        }
        serializer = UserRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert "این ایمیل قبلاً ثبت شده است." in serializer.errors["email"]

    def test_tour_register_serializer_valid(self):
        data = {
            "username": "tourmanager1",
            "password": "StrongPass1!",
            "email": "tourmanager@example.com",
            "phone_number": "09123334455",
            "company_name": "شرکت تست",
            "company_address": "تهران",
            "company_registration_number": "12345",
        }
        serializer = TourRegisterSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        user = serializer.save()
        assert user.role == "tour_manager"
        profile = user.tour_manager_profile
        profile.refresh_from_db()
        assert profile.company_name == "شرکت تست"
        assert profile.company_registration_number == "12345"

    def test_tour_register_serializer_invalid_company_reg_num(self):
        data = {
            "username": "tourman2",
            "password": "StrongPass1!",
            "email": "tourman2@example.com",
            "phone_number": "09125556677",
            "company_name": "شرکت تست",
            "company_address": "تهران",
            "company_registration_number": "12a45",
        }
        serializer = TourRegisterSerializer(data=data)
        assert not serializer.is_valid()
        assert "شماره ثبت شرکت باید بین ۳ تا ۶ رقم و فقط شامل عدد باشد." in serializer.errors["company_registration_number"]

    def test_password_reset_request_serializer_valid(self):
        user = User.objects.create_user(
            username="resetuser",
            email="reset@example.com",
            phone_number="09129998877",
            password="StrongPass1!"
        )
        serializer = PasswordResetRequestSerializer(data={"email": "reset@example.com"})
        assert serializer.is_valid()

    def test_password_reset_request_serializer_invalid_email(self):
        serializer = PasswordResetRequestSerializer(data={"email": "nonexistent@example.com"})
        assert not serializer.is_valid()
        assert "کاربری با این ایمیل یافت نشد." in serializer.errors["email"]

    def test_password_reset_confirm_serializer_valid(self):
        user = User.objects.create_user(
            username="confuser",
            email="confuser@example.com",
            phone_number="09121112222",
            password="OldPass1!"
        )
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        data = {
            "uid": uid,
            "token": token,
            "new_password": "NewStrongPass1!"
        }
        serializer = PasswordResetConfirmSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        user_after = serializer.save()
        assert user_after.check_password("NewStrongPass1!")

    def test_password_reset_confirm_serializer_invalid_token(self):
        user = User.objects.create_user(
            username="confuser2",
            email="confuser2@example.com",
            phone_number="09121113333",
            password="OldPass1!"
        )
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        data = {
            "uid": uid,
            "token": "invalid-token",
            "new_password": "NewStrongPass1!"
        }
        serializer = PasswordResetConfirmSerializer(data=data)
        assert not serializer.is_valid()
        assert "توکن معتبر نیست یا منقضی شده است." in serializer.errors["non_field_errors"]
