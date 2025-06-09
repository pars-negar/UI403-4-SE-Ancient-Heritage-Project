from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoginViewSet, CustomUserViewSet, UserRegisterViewSet, TourRegisterViewSet,
    PasswordResetRequestView, PasswordResetConfirmView, TourLeaderDashboardAPIView,
    DeleteAccountAPIView, UserInfoAPIView
)

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'users', CustomUserViewSet, basename='users')
router.register(r'userregister', UserRegisterViewSet, basename='userregister')
router.register(r'tourregister', TourRegisterViewSet, basename='tourregister')

urlpatterns = [
    path('oneuser/', UserInfoAPIView.as_view(), name='user-info'),
    path('', include(router.urls)), 
    path('tourleaderdashboard/', TourLeaderDashboardAPIView.as_view(), name='tour-leader-dashboard'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('account/delete/', DeleteAccountAPIView.as_view(), name='delete-account'), #این هم برا کاربر عادی هم تورلیدر
]
