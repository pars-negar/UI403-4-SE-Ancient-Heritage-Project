from rest_framework import serializers
from .models import SiteComment, TourComment

class SiteCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_role = serializers.CharField(source='get_user_role_display', read_only=True)

    class Meta:
        model = SiteComment
        fields = [
            'id',
            'user',
            'username',
            'user_role',
            'comment',
            'rating',
            'created_at',
        ]
        read_only_fields = ['user', 'username', 'user_role', 'created_at']

class TourCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    tour_name = serializers.CharField(source='tour.tour_name', read_only=True)

    class Meta:
        model = TourComment
        fields = [
            'id',
            'tour',
            'tour_name',
            'user',
            'username',
            'comment',
            'rating',
            'trip_date',
            'created_at',
            'likes',
            'dislikes',
        ]
        read_only_fields = [
            'user',
            'username',
            'created_at',
            'likes',
            'dislikes',
            'tour_name',
        ]
