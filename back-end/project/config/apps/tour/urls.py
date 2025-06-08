from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView, TourCreateAPIView,TourDetailView


router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')

urlpatterns = [
    path('', include(router.urls)),
    # Custom endpoint for searching tours using filters like origin, destination, dates
    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attraction-search'),
    path('toursearch/', TourSearchView.as_view(), name='tour-search'),
    path('create/', TourCreateAPIView.as_view(), name='tour-create'),
    path('tour/<int:pk>/', TourDetailView.as_view(), name='tour-create'),
]
