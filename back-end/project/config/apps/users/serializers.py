from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'role')

# 🔥 Serializer برای لاگین
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

from rest_framework import serializers

# ✅ دریافت شماره تلفن برای ارسال OTP
class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

# ✅ دریافت OTP برای تأیید
class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6)
