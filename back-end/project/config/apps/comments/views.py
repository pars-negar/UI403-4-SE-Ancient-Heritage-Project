from rest_framework import viewsets, permissions
from .models import SiteComment, TourComment
from .serializers import SiteCommentSerializer, TourCommentSerializer
from apps.users.permissions import IsOwnerOrAdmin, IsOwnerOrReadOnly 

class SiteCommentViewSet(viewsets.ModelViewSet):
    queryset = SiteComment.objects.all().order_by('-created_at')
    serializer_class = SiteCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return SiteComment.objects.all().order_by('-created_at')
        return SiteComment.objects.filter(is_approved=True).order_by('-created_at')


class TourCommentViewSet(viewsets.ModelViewSet):
    queryset = TourComment.objects.all().order_by('-created_at')
    serializer_class = TourCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return TourComment.objects.all().order_by('-created_at')
        return TourComment.objects.filter(is_approved=True).order_by('-created_at')
