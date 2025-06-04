from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView ,TourCreateAPIView

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')



urlpatterns = [
    path('', include(router.urls)),
   
    # Custom endpoint for searching attractions (via custom API view)
    path('attractionsearch/', AttractionSearchAPIView.as_view(), name='attractionsearch'),

    # Custom endpoint for searching tours using filters like origin, destination, dates
    path('toursearch/', TourSearchView.as_view(), name='toursearch'),
    path('create/', TourCreateAPIView.as_view(), name='tour-create'),
]

