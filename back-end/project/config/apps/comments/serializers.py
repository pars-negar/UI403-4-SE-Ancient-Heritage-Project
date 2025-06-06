from rest_framework import serializers
from .models import SiteComment

class SiteCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = SiteComment
        fields = ['id', 'user', 'username', 'comment', 'rating', 'created_at', 'is_approved']
        read_only_fields = ['user', 'created_at', 'is_approved']
