from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')



urlpatterns = [
    path('api/', include(router.urls)),
   
    # Custom endpoint for searching attractions (via custom API view)
    path('api/attractionsearch/', AttractionSearchAPIView.as_view(), name='attractionsearch'),

    # Custom endpoint for searching tours using filters like origin, destination, dates
    path('api/toursearch/', TourSearchView.as_view(), name='toursearch'),
]

