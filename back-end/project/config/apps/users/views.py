from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer, LoginSerializer, UserRegisterSerializer , TourRegisterSerializer
from rest_framework import generics
from .models import User, TourManagerProfile

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


# register
class UserRegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "ثبت نام موفقیت آمیز بود!",
                "user": UserRegisterSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TourRegisterViewSet(generics.CreateAPIView):
    serializer_class = TourRegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

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