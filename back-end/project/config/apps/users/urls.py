from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginViewSet, CustomUserViewSet, UserRegisterViewSet, TourRegisterViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'users', CustomUserViewSet, basename='users')
router.register(r'userregister', UserRegisterViewSet, basename='userregister') 
router.register(r'tourregister', TourRegisterViewSet, basename='tourregister')

urlpatterns = [
    path('api/', include(router.urls)),
]
