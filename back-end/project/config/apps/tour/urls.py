from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, TourSearchView, AttractionSearchAPIView, TourCreateAPIView


router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')

urlpatterns = [
    path('', include(router.urls)),

    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attraction-search'),
    path('toursearch/', TourSearchView.as_view(), name='tour-search'),
    path('create/', TourCreateAPIView.as_view(), name='tour-create'),
]
