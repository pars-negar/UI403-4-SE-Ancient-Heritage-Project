
from django.urls import path
from .views import HomePageAPIView ,TourPageAPIView, AttractionDetailAPIView, TourDetailView,AttractionPageAPIView,get_cities_with_places,get_origins_and_destinations

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
     path('tour/<int:pk>/', TourDetailView.as_view(), name='tour-detail'),
    path('attraction/<int:pk>/', AttractionDetailAPIView.as_view(), name='attraction-detail'),
     path('attraction-page/', AttractionPageAPIView.as_view(), name='attraction-page'),
    path('places/cities/', get_cities_with_places),
    path('tour-cities/', get_origins_and_destinations, name='tour-cities'),

]