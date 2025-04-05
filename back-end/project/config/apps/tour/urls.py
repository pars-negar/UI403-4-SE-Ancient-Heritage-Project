from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')

urlpatterns = [
    path('api/', include(router.urls)),
]
