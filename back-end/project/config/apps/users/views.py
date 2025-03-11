from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializers
class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializers
