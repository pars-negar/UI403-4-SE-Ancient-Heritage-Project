from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/attractionsearch/', AttractionSearchAPIView.as_view(), name='attraction-search'),  
    path('api/toursearch/', TourSearchView.as_view(), name='tour-search'),  
]

