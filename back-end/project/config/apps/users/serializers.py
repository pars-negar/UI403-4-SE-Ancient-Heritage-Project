from rest_framework import serializers
from .models import CustomUser , TourManagerProfile
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.exceptions import ValidationError
import re

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'role')

# serializer for login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

from rest_framework import serializers

# send otp  code for user
class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

# ressive otp code from user
class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)



# serializer for register
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'phone_number']

    # Phone number validation
    def validate_phone_number(self, value):
        if not re.match(r'^\d{11}$', value):  
            raise ValidationError("شماره تلفن باید 11 رقمی باشد.")
        
         # Check the uniqueness of the phone number
        if User.objects.filter(phone_number=value).exists():
            raise ValidationError("این شماره تلفن قبلاً ثبت شده است.")
        
        return value

    # Email validation
    def validate_email(self, value):
    # Check the uniqueness of Email
        if User.objects.filter(email=value).exists():
            raise ValidationError("این ایمیل قبلاً ثبت شده است.")
        return value

    # Username validation
    def validate_username(self, value):
        # Checking the uniqueness of the username
        if User.objects.filter(username=value).exists():
            raise ValidationError("این نام کاربری قبلاً استفاده شده است.")
        return value
    

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class TourRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    company_name = serializers.CharField(required=False) 
    company_address = serializers.CharField(required=False) 
    company_registration_number = serializers.CharField(required=False) 
    
    class Meta:
        model = User 
        fields = [
            'username', 'password', 'confirm_password', 'email', 'phone_number',
            'company_name', 'company_address', 'company_registration_number',
            'company_phone', 'company_email'
        ]
    
    # اعتبارسنجی شماره تلفن
    def validate_phone_number(self, value):
        if not re.match(r'^\d{11}$', value):  
            raise ValidationError("شماره تلفن باید 11 رقمی باشد.")
        
        if User.objects.filter(phone_number=value).exists():
            raise ValidationError("این شماره تلفن قبلاً ثبت شده است.")
        
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("این ایمیل قبلاً ثبت شده است.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("این نام کاربری قبلاً استفاده شده است.")
        return value
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("رمز عبور و تایید رمز عبور مطابقت ندارند.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # حذف فیلد تایید رمز عبور
        user = User.objects.create_user(**validated_data)

        if user.role == 'tour_manager':
            company_data = {key: validated_data[key] for key in 
                            ['company_name', 'company_address', 'company_registration_number', 'company_phone', 'company_email'] if key in validated_data}
            TourManagerProfile.objects.create(user=user, **company_data)

        return user