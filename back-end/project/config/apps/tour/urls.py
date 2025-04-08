from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  AttractionViewSet , TourSearchView , AttractionSearchAPIView

router = DefaultRouter()
router.register(r'attraction', AttractionViewSet, basename='attraction')
router.register(r'toursearch', TourSearchView, basename='toursearch')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/attractionsearch/', AttractionSearchAPIView.as_view(), name='attraction-search'),  # اضافه کردن مسیر جستجو برای AttractionSearchAPIView

]

