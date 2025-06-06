from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import (
    CustomUserSerializer,
    LoginSerializer,
    UserRegisterSerializer,
    TourRegisterSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)

from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
import requests
from django.core.cache import cache
import logging

User = get_user_model()
logger = logging.getLogger(__name__)


# ViewSet for user login
class LoginViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "ورود با موفقیت انجام شد.",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            return Response({"error": "نام کاربری یا رمز عبور نادرست است!"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Read-only view for all users
class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


# ViewSet for normal user registration (with OTP)
class UserRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # ذخیره موقت اطلاعات کاربر در کش با تایم‌اوت 10 دقیقه
            cache_key = f'user_{phone_number}'
            cache.set(cache_key, {
                'username': username,
                'phone_number': phone_number,
                'email': email,
                'password': password
            }, timeout=600)

            otp_api_url = f'{settings.HADIR_HAWITY_API_URL}/auth/send-otp/'
            try:
                otp_response = requests.post(
                    otp_api_url,
                    data={
                        'username': username,
                        'phone_number': phone_number,
                        'email': email,
                        'password': password,
                    },
                    timeout=10
                )
                if otp_response.status_code == 200:
                    return Response({
                        "message": "ثبت نام موفقیت آمیز بود! OTP ارسال شد.",
                        "user": serializer.data  # فقط اطلاعات کاربر بدون ذخیره در دیتابیس
                    }, status=status.HTTP_201_CREATED)
                else:
                    logger.error(f"OTP sending failed: {otp_response.text}")
                    return Response({'error': 'خطا در ارسال OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except requests.RequestException as e:
                logger.error(f"OTP request exception: {e}")
                return Response({'error': 'خطا در ارتباط با سرور OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ViewSet for handling tour manager registration (with OTP)
class TourRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = TourRegisterSerializer(data=request.data)
        if serializer.is_valid():
            company_name = serializer.validated_data.get('company_name')
            company_address = serializer.validated_data.get('company_address')
            company_registration_number = serializer.validated_data.get('company_registration_number')
            phone_number = serializer.validated_data.get('phone_number')
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')

            # ذخیره موقت اطلاعات مدیر تور در کش
            cache_key = f'tour_manager_{phone_number}'
            cache.set(cache_key, {
                'username': username,
                'phone_number': phone_number,
                'email': email,
                'password': password,
                'company_name': company_name,
                'company_address': company_address,
                'company_registration_number': company_registration_number,
            }, timeout=600)

            otp_api_url = f'{settings.HADIR_HAWITY_API_URL}/auth/send-otp/'
            try:
                otp_response = requests.post(
                    otp_api_url,
                    data={
                        'username': username,
                        'phone_number': phone_number,
                        'email': email,
                        'password': password,
                        'company_name': company_name,
                        'company_address': company_address,
                        'company_registration_number': company_registration_number,
                    },
                    timeout=10
                )
                if otp_response.status_code == 200:
                    # توجه: user هنوز ساخته نشده است، اگر بخواهی می‌توانی این بخش را اصلاح کنی
                    return Response({
                        "message": "ثبت نام موفقیت آمیز بود! OTP ارسال شد.",
                        "user": {
                            "username": username,
                            "email": email,
                            "company_name": company_name,
                            "company_address": company_address,
                            "company_registration_number": company_registration_number,
                        }
                    }, status=status.HTTP_201_CREATED)
                else:
                    logger.error(f"OTP sending failed: {otp_response.text}")
                    return Response({'error': 'خطا در ارسال OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except requests.RequestException as e:
                logger.error(f"OTP request exception: {e}")
                return Response({'error': 'خطا در ارتباط با سرور OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View to handle password reset requests.
class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "کاربری با این ایمیل یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://yourdomain.com/reset-password/{uid}/{token}/"

            try:
                send_mail(
                    subject="بازیابی رمز عبور",
                    message=f"برای تغییر رمز عبور روی این لینک کلیک کنید:\n{reset_link}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=False,
                )
            except Exception as e:
                logger.error(f"Error sending reset password email: {e}")
                return Response({"error": "خطا در ارسال ایمیل بازیابی رمز عبور."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "لینک بازیابی رمز عبور ارسال شد."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Handles POST requests for confirming password reset.
class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "رمز عبور با موفقیت تغییر کرد."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


