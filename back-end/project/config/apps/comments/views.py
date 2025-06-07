from rest_framework import viewsets, permissions
from .models import SiteComment
from .serializers import SiteCommentSerializer
from apps.users.permissions import *
from rest_framework.permissions import *

class SiteCommentViewSet(viewsets.ModelViewSet):
    queryset = SiteComment.objects.all().order_by('-created_at')
    serializer_class = SiteCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return SiteComment.objects.all()
