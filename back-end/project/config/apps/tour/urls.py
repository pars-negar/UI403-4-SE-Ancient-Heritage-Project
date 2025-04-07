from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourViewSet

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')
router.register(r'toursearch', TourViewSet, basename='toursearch')


urlpatterns = [
    path('api/', include(router.urls)),
]

