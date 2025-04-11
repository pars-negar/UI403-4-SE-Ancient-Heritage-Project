from rest_framework import serializers
from .models import CustomUser , TourManagerProfile
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import re
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'role')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

from rest_framework import serializers

class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'phone_number']

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
    

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class TourRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    company_name = serializers.CharField() 
    company_address = serializers.CharField()
    company_registration_number = serializers.CharField ()
    
    class Meta:
        model = User 
        fields = [
            'username', 'password', 'email', 'phone_number',
            'company_name', 'company_address', 'company_registration_number',
        ]
    
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
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        if user.role == 'tour_manager':
            company_data = {key: validated_data[key] for key in 
                            ['company_name', 'company_address', 'company_registration_number'] if key in validated_data}
            TourManagerProfile.objects.create(user=user, **company_data)

        return user
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
      
    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("کاربری با این ایمیل یافت نشد.")
        return value
    


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8, write_only=True)
    
    
def validate(self, data):
    try:
        uid = force_str(urlsafe_base64_decode(data['uid']))
        user = User.objects.get(pk=uid)
        
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        raise serializers.ValidationError("کاربر معتبر نیست.")
    
    if not default_token_generator.check_token(user, data['token']):
        raise serializers.ValidationError("توکن معتبر نیست یا منقضی شده است.")
    
    data['user'] = user
    return data

def save(self):
    user = self.validated_data['user']
    user.set_password(self.validated_data['new_password'])
    user.save()
    
    
    

