from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from .views import (
    AttractionViewSet,
    TourSearchView,
    AttractionSearchAPIView,
    CreateTourAPIView,
    TourRegisterAPIView
)
=======
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView ,TourCreateAPIView
>>>>>>> bddb0ca2bc98ddbc93efc559cf8932a0c902bad4

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')

urlpatterns = [
    path('', include(router.urls)),
<<<<<<< HEAD
    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attractionsearch'),
    path('toursearch/', TourSearchView.as_view(), name='toursearch'),
    path('create_tour/', CreateTourAPIView.as_view(), name='create_tour'),
    path('register/<int:tour_id>/', TourRegisterAPIView.as_view(), name='tour-register'),  # اصلاح شد
=======
   
    # Custom endpoint for searching attractions (via custom API view)
    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attractionsearch'),

    # Custom endpoint for searching tours using filters like origin, destination, dates
    path('toursearch/', TourSearchView.as_view(), name='toursearch'),
    path('create/', TourCreateAPIView.as_view(), name='tour-create'),
>>>>>>> bddb0ca2bc98ddbc93efc559cf8932a0c902bad4
]
