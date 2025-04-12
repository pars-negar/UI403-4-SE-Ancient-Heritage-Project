from rest_framework import serializers
from .models import CustomUser , TourManagerProfile
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import re

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'role')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    


class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)


# Serializer for registering regular users
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Password will be write-only
    phone_number = serializers.CharField()  # Phone number field
    
    class Meta:
        model = User  # The User model
        fields = ['username', 'password', 'email', 'phone_number']  # Fields included in serialization

    # Validate phone number: must be 11 digits and unique
    def validate_phone_number(self, value):
        if not re.match(r'^\d{11}$', value):
            raise ValidationError("شماره تلفن باید 11 رقمی باشد.")
        
        if User.objects.filter(phone_number=value).exists():
            raise ValidationError("این شماره تلفن قبلاً ثبت شده است.")
        
        return value

    # Validate email: proper format and uniqueness
    def validate_email(self, value):
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise ValidationError("لطفاً یک ایمیل معتبر وارد کنید.")

        if User.objects.filter(email=value).exists():
            raise ValidationError("این ایمیل قبلاً ثبت شده است.")
        return value

    # Validate username: must be unique
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("این نام کاربری قبلاً استفاده شده است.")
        return value

    # Validate password: must include uppercase, number, special character, min 8 characters
    def validate_password(self, value):
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_regex, value):
            raise ValidationError("پسورد باید حداقل ۸ کاراکتر، شامل یک حرف بزرگ، یک عدد و یک نماد خاص باشد.")

    # Create user using built-in method (automatically hashes password)
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# Serializer for registering tour company managers
class TourRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    company_name = serializers.CharField()
    company_address = serializers.CharField()
    company_registration_number = serializers.CharField()
    
    class Meta:
        model = User  # Base user model (should support tour role)
        fields = [
            'username', 'password', 'email', 'phone_number',
            'company_name', 'company_address', 'company_registration_number',
        ]
    
    # Validate phone number: 11 digits and unique
    def validate_phone_number(self, value):
        if not re.match(r'^\d{11}$', value):
            raise ValidationError("شماره تلفن باید 11 رقمی باشد.")
        
        if User.objects.filter(phone_number=value).exists():
            raise ValidationError("این شماره تلفن قبلاً ثبت شده است.")
        
        return value

    # Validate email format and uniqueness
    def validate_email(self, value):
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise ValidationError("لطفاً یک ایمیل معتبر وارد کنید.")
        
        if User.objects.filter(email=value).exists():
            raise ValidationError("این ایمیل قبلاً ثبت شده است.")
        return value

    # Validate username uniqueness
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("این نام کاربری قبلاً استفاده شده است.")
        return value

    # Validate strong password
    def validate_password(self, value):
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_regex, value):
            raise ValidationError("پسورد باید حداقل ۸ کاراکتر، شامل یک حرف بزرگ، یک عدد و یک نماد خاص باشد.")

    # Validate company registration number (only digits, 3-6 characters)
    def validate_company_registration_number(self, value):
        if not re.match(r'^\d{3,6}$', value):
            raise ValidationError("شماره ثبت شرکت باید بین ۳ تا ۶ رقم و فقط شامل عدد باشد.")
        return value

    # Create tour manager user and related company profile
    def create(self, validated_data):
        # Create the user account
        user = User.objects.create_user(**validated_data)

        # If user has role 'tour_manager', create a company profile
        if user.role == 'tour_manager':
            # Extract company fields
            company_data = {
                key: validated_data[key]
                for key in ['company_name', 'company_address', 'company_registration_number']
                if key in validated_data
            }
            # Create tour manager profile
            TourManagerProfile.objects.create(user=user, **company_data)

        return user
