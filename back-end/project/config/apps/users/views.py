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

User = get_user_model()

# login
class LoginViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            print(f"Received: username={username}, password={password}") 
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "Login successful!",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#view for user
class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

# ViewSet for handling user registration
class UserRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        # Instantiate the serializer with request data
        serializer = UserRegisterSerializer(data=request.data)
        
        # Check if the provided data is valid
        if serializer.is_valid():
            # Save the user (create the user object)
            user = serializer.save()
            
            # Return a success response with the created user data
            return Response({
                "message": "ثبت نام موفقیت آمیز بود!",  # "Registration successful!"
                "user": UserRegisterSerializer(user).data  # Return serialized user info
            }, status=status.HTTP_201_CREATED)
        
        # If validation fails, return the error details
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ViewSet for handling tour manager registration
class TourRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        # Instantiate the serializer with request data
        serializer = TourRegisterSerializer(data=request.data)

        # Check if the provided data is valid
        if serializer.is_valid():
            # Save the user and create their profile (handled inside the serializer)
            user = serializer.save()

            # Return a success response with basic user details
            return Response({
                'message': 'ثبت‌نام با موفقیت انجام شد.',  # "Registration completed successfully."
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }
            }, status=status.HTTP_201_CREATED)
        
        # If validation fails, return the error details
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = self.get_object() 
        if user.role == 'tour_manager': 
            company_data = {
                'company_name': request.data.get('company_name'),
                'company_address': request.data.get('company_address'),
                'company_registration_number': request.data.get('company_registration_number'),
            }
            TourManagerProfile.objects.create(user=user, **company_data)

        return Response({
            'message': 'ثبت‌نام با موفقیت انجام شد.',
            'user': {
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
        }, status=status.HTTP_201_CREATED)
        
        
 
# View to handle password reset requests.
# This API view allows users to request a password reset by providing their registered email address. 
# Upon receiving a POST request, it validates the provided data using the PasswordResetRequestSerializer. 
# If the email is valid and associated with a user, it generates a unique password reset link, 
# sends an email to the user with the reset link, and returns a success message. 
# If the email is invalid or not found, it returns appropriate error messages.
           
class PasswordResetRequestView(APIView):
    def post(self, request):
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

