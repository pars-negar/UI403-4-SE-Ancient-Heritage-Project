from django.urls import path
from .views import HomePageAPIView ,TourPageAPIView

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
]