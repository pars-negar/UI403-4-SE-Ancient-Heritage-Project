from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer, LoginSerializer, UserRegisterSerializer , TourRegisterSerializer
from .models import CustomUser, TourManagerProfile

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
