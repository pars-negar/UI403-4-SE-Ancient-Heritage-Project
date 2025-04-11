from rest_framework.routers import DefaultRouter
from .views import FAQViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'faq', FAQViewSet, basename='faq')

urlpatterns = [
    path('api/', include(router.urls)),
]
