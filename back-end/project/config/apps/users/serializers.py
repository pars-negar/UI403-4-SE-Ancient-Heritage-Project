from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
import re
from django.contrib.auth.tokens import default_token_generator
from apps.tour.models import Tour
from apps.tour.serializers import TourSerializer
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from apps.users.models import TourManagerProfile
from .models import CustomUser
from rest_framework import serializers
from .models import CustomUser  

User = get_user_model()

class SimpleUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'role', 'profile_image']


class BaseUserValidationMixin:

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

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'role')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)


class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)


class UserRegisterSerializer(BaseUserValidationMixin, serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    email = serializers.EmailField(
        error_messages={
            'unique': 'این ایمیل قبلاً ثبت شده است.',
            'invalid': 'لطفاً یک ایمیل معتبر وارد کنید.'
        }
    )

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'phone_number']

    def create(self, validated_data):
        validated_data['role'] = 'user'

        user = User.objects.create_user(**validated_data)
        return user



class TourRegisterSerializer(BaseUserValidationMixin, serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    company_name = serializers.CharField()
    company_address = serializers.CharField()
    company_registration_number = serializers.CharField()
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'phone_number', 'company_name', 'company_address', 'company_registration_number']


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
        # ست کردن نقش
        validated_data['role'] = 'tour_manager'


        validated_data['role'] = 'tour_manager'

        user = User.objects.create_user(**validated_data)

 
        profile, created = TourManagerProfile.objects.get_or_create(user=user)

        profile.company_name = company_name
        profile.company_address = company_address
        profile.company_registration_number = company_registration_number
        profile.save()

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
        return user
    
class TourLeaderDashboardSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='tour_manager_profile.company_name', required=False)
    company_address = serializers.CharField(source='tour_manager_profile.company_address', required=False)
    company_registration_number = serializers.CharField(source='tour_manager_profile.company_registration_number', required=False)
    tours = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'role',
                'company_name', 'company_address', 'company_registration_number', 'tours']
        read_only_fields = ['id', 'username', 'role', 'tours']

    def get_tours(self, obj):
        if obj.role == 'tour_manager':
            tours = Tour.objects.filter(created_by=obj)
            return TourSerializer(tours, many=True, context=self.context).data
        return []

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()

        profile_data = validated_data.get('tour_manager_profile', {})
        if hasattr(instance, 'tour_manager_profile'):
            profile = instance.tour_manager_profile
            profile.company_name = profile_data.get('company_name', profile.company_name)
            profile.company_address = profile_data.get('company_address', profile.company_address)
            profile.company_registration_number = profile_data.get('company_registration_number', profile.company_registration_number)
            profile.save()

        return instance
