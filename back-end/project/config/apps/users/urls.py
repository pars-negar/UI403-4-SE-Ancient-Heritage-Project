from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginViewSet, CustomUserViewSet, UserRegisterViewSet, TourRegisterViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'users', CustomUserViewSet, basename='users')

# Register the UserRegisterViewSet at the endpoint /userregister/
router.register(r'userregister', UserRegisterViewSet, basename='userregister')

# Register the TourRegisterViewSet at the endpoint /tourregister/
router.register(r'tourregister', TourRegisterViewSet, basename='tourregister')


urlpatterns = [
    path('api/', include(router.urls)),
]
