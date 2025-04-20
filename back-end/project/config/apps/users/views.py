from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer, LoginSerializer, UserRegisterSerializer , TourRegisterSerializer
from .models import CustomUser, TourManagerProfile
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from django.conf import settings
import requests
from django.core.cache import cache


User = get_user_model()

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

# ViewSet for normal user registration
class UserRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        # Instantiate the serializer with request data
        serializer = UserRegisterSerializer(data=request.data)

        # Check if the provided data is valid
        if serializer.is_valid():
            # Save the user (create the user object)
            
            phone_number = serializer.validated_data['phone_number']
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password= serializer.validated_data['password']
            
            
            # ذخیره اطلاعات کاربر در کش به مدت 10 دقیقه (600 ثانیه)
            cache.set(f'user_{phone_number}', {'username': username, 'phone_number': phone_number, 'email': email, 'password':password,}, timeout=600)
            
            # URL اپ احراز هویت
            otp_api_url = f'{settings.HADIR_HAWITY_API_URL}/send-otp/'
            otp_response = requests.post(otp_api_url, data={'username': username, 'phone_number': phone_number, 'email': email,'password':password,})
            
            if otp_response.status_code == 200:
                return Response({
                    "message": "ثبت نام موفقیت آمیز بود! OTP ارسال شد.",
                    "user": serializer.data  # فقط اطلاعات کاربر بدون ذخیره در دیتابیس
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # If validation fails, return the error details
        # This will include detailed error messages for each field (e.g., password error)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSet for handling tour manager registration
class TourRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = TourRegisterSerializer(data=request.data)

        if serializer.is_valid():
            # ذخیره‌ی کاربر و ساخت پروفایل شرکت (در داخل serializer هندل می‌شه)
            user = serializer.save()

            return Response({
                'message': 'ثبت‌نام با موفقیت انجام شد.',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            
 
# View to handle password reset requests.
# This API view allows users to request a password reset by providing their registered email address. 
# Upon receiving a POST request, it validates the provided data using the PasswordResetRequestSerializer. 
# If the email is valid and associated with a user, it generates a unique password reset link, 
# sends an email to the user with the reset link, and returns a success message. 
# If the email is invalid or not found, it returns appropriate error messages.
           
class PasswordResetRequestView(APIView):
    def post(self, request):
        print(request.data)
        serializer = PasswordResetRequestSerializer(data = request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"  # یا آدرس واقعی فرانت‌اند 
            
            send_mail(
                subject= "بازیابی رمز عبور ",
                message=f"برای تغییر رمز عبور روی این لینک کلیک کنید:\n{reset_link}",
                from_email="fatememhdzdeee@gmail.com",
                recipient_list=[user.email],
            )
            
            return Response({"message": "لینک بازیابی رمز عبور ارسال شد."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
 
    
# Handles POST requests for confirming password reset.

class PasswordResetConfirmView(APIView):
    
    # This view validates the provided data using the PasswordResetConfirmSerializer,
    # updates the user's password if the data is valid, and returns an appropriate response.
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "رمز عبور با موفقیت تغییر کرد."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

