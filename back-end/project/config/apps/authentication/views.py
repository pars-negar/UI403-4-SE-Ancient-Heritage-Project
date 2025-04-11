from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import ghasedakpack
from random import randint
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model


GHASEDAK_API_KEY = "YOUR_GHASEDAK_API_KEY"
sms = ghasedakpack.Ghasedak(GHASEDAK_API_KEY)
good_line_number_for_sending_otp = '30005088'

class SendOTPView(APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        if not phone_number:
            return Response({'error': 'Phone number is required'}, status=status.HTTP_400_BAD_REQUEST)

        otp = str(randint(100000, 999999))
        cache.set(phone_number, otp, timeout=120)  

        try:
           # response = sms.verification({
           #     'receptor': phone_number,
           #     'linenumber': good_line_number_for_sending_otp,
            #    'type': 1,
             #   'template': 'Ghasedak',
              #  'param1': otp
            #})
            
            print(f"✅ OTP برای {phone_number}: {otp}")   
            return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"SMS Error: {e}")
            return Response({'error': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        otp = request.data.get('otp')
        
        if not phone_number or not otp:
            return Response({'error': 'Phone number and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        stored_otp = cache.get(phone_number)
        if stored_otp and stored_otp == otp:
            # کاربر رو از مدل User می‌گیریم
            User = get_user_model()
            user, created = User.objects.get_or_create(phone_number=phone_number)
            
            # توکن جدید JWT رو می‌سازیم
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'OTP verified successfully',
                # 'access': str(refresh.access_token),
                #'refresh': str(refresh)
                             }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

