
from django.urls import path
from .views import (HomePageAPIView ,TourPageAPIView, AttractionDetailAPIView,
                    TourDetailView,AttractionPageAPIView,get_cities_with_places,
                    TourDetailAPIView, TourListAPIView, TourUpdateAPIView, TourSoftDeleteAPIView,get_origins_and_destinations,CreateTourAPIView
)
urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
     path('tour/<int:pk>/', TourDetailView.as_view(), name='tour-detail'),
    path('attraction/<int:pk>/', AttractionDetailAPIView.as_view(), name='attraction-detail'),
     path('attraction-page/', AttractionPageAPIView.as_view(), name='attraction-page'),
    path('places/cities/', get_cities_with_places),
    path('dashboard/tours/', TourListAPIView.as_view(), name='tour-list'),
    path('dashboard/tours/<int:pk>/', TourDetailAPIView.as_view(), name='tour-detail'),
    path('dashboard/tours/<int:pk>/edit/', TourUpdateAPIView.as_view(), name='tour-update'),

    path('dashboard/my-tours/delete/', TourSoftDeleteAPIView.as_view(), name='delete-my-tour'),
 path('tour/cities/', get_origins_and_destinations),


    path('dashboard/my-tours/delete/', TourSoftDeleteAPIView.as_view(), name='delete-my-tour'), 
    path('dashboard/tours/create/', CreateTourAPIView.as_view(), name='create-tour'),

]

