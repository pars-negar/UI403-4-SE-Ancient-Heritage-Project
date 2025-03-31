from django.urls import path
from .views import SendOTPView, VerifyOTPView, RegisterViewSet

urlpatterns = [
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('register/', RegisterViewSet.as_view({'post': 'create'}), name='register'),
]
