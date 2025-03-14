from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  LoginViewSet, CustomUserViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'users', CustomUserViewSet, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
]
