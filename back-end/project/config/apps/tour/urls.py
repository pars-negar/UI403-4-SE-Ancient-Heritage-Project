from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AttractionViewSet,
    TourSearchView,
    AttractionSearchAPIView,
    CreateTourAPIView,
    TourRegisterAPIView
)

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')

urlpatterns = [
    path('', include(router.urls)),
    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attractionsearch'),
    path('toursearch/', TourSearchView.as_view(), name='toursearch'),
    path('create_tour/', CreateTourAPIView.as_view(), name='create_tour'),
    path('register/<int:tour_id>/', TourRegisterAPIView.as_view(), name='tour-register'),  # اصلاح شد
]
