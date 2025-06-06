from django.urls import path, include
from .views import SiteCommentViewSet, TourCommentViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'site-comments', SiteCommentViewSet, basename='site-comment')
router.register(r'tour-comments', TourCommentViewSet, basename='tourcomment')

urlpatterns = [
    path('', include(router.urls)),
]
