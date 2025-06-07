from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import SiteComment
from .serializers import SiteCommentSerializer
from apps.users.permissions import *
from rest_framework.permissions import *

class SiteCommentViewSet(viewsets.ModelViewSet):
    queryset = SiteComment.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = SiteCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if self.request.user.is_staff:
            return SiteComment.objects.all()
        return SiteComment.objects.filter(is_approved=True)
