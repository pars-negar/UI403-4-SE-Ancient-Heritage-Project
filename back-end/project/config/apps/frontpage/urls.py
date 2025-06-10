from django.urls import path
from .views import (
    HomePageAPIView,
    TourPageAPIView,
    AttractionPageAPIView,
    AttractionDetailAPIView,
    get_cities_with_places,
    get_origins_and_destinations,
    TourDetailAPIView,
    TourListAPIView,
    TourUpdateAPIView,
    TourSoftDeleteAPIView,
    CreateTourAPIView,
    TourReservationAPIView,
    SearchTourAPIView,
    DashboardRedirectAPIView,
    UserProfileView,
    TourDetailView,
    PassengerListAPIView
)

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
    
    path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
    path('tour/<int:pk>/', TourDetailView.as_view(), name='tour-detail'),
    path('tour/cities/', get_origins_and_destinations, name='tour-cities'),
    path('tour-reservations/', TourReservationAPIView.as_view(), name='tour-reservation'),
     path('tours/search/', SearchTourAPIView.as_view(), name='search-tours'),

    path('attraction/<int:pk>/', AttractionDetailAPIView.as_view(), name='attraction-detail'),
    path('attraction-page/', AttractionPageAPIView.as_view(), name='attraction-page'),
    path('places/cities/', get_cities_with_places, name='cities-with-places'),

    # Dashboard
    path('dashboard/tours/', TourListAPIView.as_view(), name='tour-list'),
    path('dashboard/tours/<int:pk>/', TourDetailAPIView.as_view(), name='dashboard-tour-detail'),
    path('dashboard/tours/<int:pk>/edit/', TourUpdateAPIView.as_view(), name='tour-update'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('dashboard/my-tours/delete/', TourSoftDeleteAPIView.as_view(), name='delete-my-tour'),
    path('tour/cities/', get_origins_and_destinations),
    path('dashboard/my-tours/delete/', TourSoftDeleteAPIView.as_view(), name='delete-my-tour'), 
    path('dashboard/tours/create/', CreateTourAPIView.as_view(), name='create-tour'),
    path('dashboard-url/', DashboardRedirectAPIView.as_view(), name='dashboard-url'),
    path('dashboard/tours/<int:tour_id>/passengers/', PassengerListAPIView.as_view(), name='tour-passenger-list'),


]
