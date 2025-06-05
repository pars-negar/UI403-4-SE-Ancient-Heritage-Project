
from django.urls import path
from .views import HomePageAPIView ,TourPageAPIView, AttractionDetailAPIView, TourDetailAPIView

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
     path('tour/<int:pk>/', TourDetailAPIView.as_view(), name='tour-detail'),
    path('attraction/<int:pk>/', AttractionDetailAPIView.as_view(), name='attraction-detail'),
]