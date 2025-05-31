import requests
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from random import randint
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


GHASEDAK_API_KEY = "78a33e51203b08913a6cef083b92d212c713a74b603afc50af0e10370c7a1465QkEAodV6AH7WLUaR"
good_line_number_for_sending_otp = '30005088'
sms_url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams"

class SendOTPView(APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        username = request.data.get('username') 
        email = request.data.get('email')  
        password = request.data.get('password')

        if not phone_number:
            return Response({'error': 'Phone number is required'}, status=status.HTTP_400_BAD_REQUEST)

        otp = str(randint(100000, 999999))
        cache.set(phone_number, otp, timeout=120)  
        cache.set(f'user_{phone_number}', {'username': username, 'phone_number': phone_number, 'email': email , 'password':password,}, timeout=600)
        
        headers = {
            'accept': 'application/json',
            'ApiKey': GHASEDAK_API_KEY
        }

        data = {
    "receptors": [{"mobile": phone_number}],  # فقط شماره موبایل
    "templateName": "parsnegar",
    "param1": otp,
    "isVoice": False,
    "udh": False
}


        
        try:
            response = requests.post(sms_url, headers=headers, json=data)
            response_data = response.json()  # اینجا پاسخ API را دریافت می‌کنید
            print(data)
            print(response_data) 
            
            if response_data.get('isSuccess'):
                return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
            else:
                print(f"Error sending OTP: {response_data.get('message')}")
                return Response({'error': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as e:
            print(f"SMS Error: {e}")
            return Response({'error': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    

class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone_number')
        otp = request.data.get('otp_code')
        print("Received OTP Verification Request:", {
            'phone_number': phone_number,
            'otp_code': otp,
        })
        
        if not phone_number or not otp:
            return Response({'error': 'Phone number and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        # دریافت OTP ذخیره‌شده از کش
        stored_otp = cache.get(phone_number)
        print(f"Retrieved OTP for {phone_number}: {stored_otp}")

        # دریافت اطلاعات کاربر از کش
        user_info = cache.get(f'user_{phone_number}')
        if stored_otp and stored_otp == otp:
            user_info = cache.get(f'user_{phone_number}')
            if user_info:
                User = get_user_model()
                user_exists = User.objects.filter(phone_number=user_info['phone_number']).first()
                if not user_exists:
                    user = User(
                        phone_number=user_info['phone_number'],
                        username=user_info['username'],
                        email=user_info['email'],
                    )
                    user.set_password(user_info['password'])  # هش کردن رمز عبور
                    user.save()
                else:
                    user = user_exists
            # کاربر رو از مدل User می‌گیریم
                cache.delete(f'user_{phone_number}')
                cache.delete(phone_number)  # OTP را هم از کش حذف می‌کنیم

                # ساخت توکن جدید برای کاربر
                refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'OTP verified successfully',
                 'access': str(refresh.access_token),
                'refresh': str(refresh)
                             }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

