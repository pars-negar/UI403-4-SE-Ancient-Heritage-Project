from django.urls import path, include
from .views import SiteCommentViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'site-comments', SiteCommentViewSet, basename='site-comment')

urlpatterns = [
    path('', include(router.urls)),
]
