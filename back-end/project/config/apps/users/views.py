from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializers

from rest_framework.views import APIView
from rest_framework.response import Response
from apps.authentication.models import OTPCode
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")
        otp_code = request.data.get("otp_code")
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            otp = OTPCode.objects.get(phone_number=phone_number, code=otp_code)
            if not otp.is_valid():
                return Response({"error": "OTP expired!"}, status=400)
        except OTPCode.DoesNotExist:
            return Response({"error": "Invalid OTP!"}, status=400)

        # ایجاد کاربر جدید
        user = User.objects.create_user(username=username, phone_number=phone_number, password=password)
        return Response({"message": "User registered successfully!"})

class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializers
