from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')
router.register(r'toursearch', TourSearchView, basename='toursearch')


urlpatterns = [
    path('api/', include(router.urls)),
]

