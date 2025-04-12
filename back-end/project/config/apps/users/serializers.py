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
    # جدا کردن فیلدهای مربوط به شرکت
        company_name = validated_data.pop('company_name', None)
        company_address = validated_data.pop('company_address', None)
        company_registration_number = validated_data.pop('company_registration_number', None)

        # ساخت یوزر
        user = User.objects.create_user(**validated_data)

        # ساخت پروفایل شرکت اگر نقش کاربر tour_manager بود
        if user.role == 'tour_manager':
            TourManagerProfile.objects.create(
                user=user,
                company_name=company_name,
                company_address=company_address,
                company_registration_number=company_registration_number
            )

        return user

    
# Serializer for handling password reset requests.
# It validates that the provided email is registered in the system.  
  
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

    
# Validates the provided data to ensure the user exists and the token is valid.
# This function decodes the UID, retrieves the corresponding user, and checks the validity of the token.   
 
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

# Saves the new password for the user after validation.
# This method updates the user's password and saves the changes to the database.

def save(self):
    user = self.validated_data['user']
    user.set_password(self.validated_data['new_password'])
    user.save()
    
    
    
