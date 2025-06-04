<<<<<<< HEAD
from django.urls import path
from .views import HomePageAPIView ,TourPageAPIView

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page', TourPageAPIView.as_view(), name='tour-page'),
=======
from django.urls import path
from .views import HomePageAPIView ,TourPageAPIView

urlpatterns = [
    path('', HomePageAPIView.as_view(), name='homepage'),
     path('tour-page/', TourPageAPIView.as_view(), name='tour-page'),
>>>>>>> bddb0ca2bc98ddbc93efc559cf8932a0c902bad4
]