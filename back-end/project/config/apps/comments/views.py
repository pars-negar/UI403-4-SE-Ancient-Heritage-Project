from rest_framework import viewsets, permissions
from .models import SiteComment, TourComment
from .serializers import SiteCommentSerializer, TourCommentSerializer
from .permissions import IsOwnerOrReadOnly 

class SiteCommentViewSet(viewsets.ModelViewSet):
    queryset = SiteComment.objects.all().order_by('-created_at')
    serializer_class = SiteCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # موقع ایجاد کامنت، کاربر وارد شده ثبت می‌شود
        serializer.save(user=self.request.user)


class TourCommentViewSet(viewsets.ModelViewSet):
    queryset = TourComment.objects.all()
    serializer_class = TourCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return TourComment.objects.all()
