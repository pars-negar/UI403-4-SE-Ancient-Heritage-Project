from rest_framework import serializers
from .models import SiteComment, TourComment

class SiteCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_role = serializers.CharField(source='get_user_role_display', read_only=True)
    profile_image = serializers.SerializerMethodField()

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
            'profile_image',
        ]
        read_only_fields = ['user', 'username', 'user_role', 'created_at', 'profile_image']

    def get_profile_image(self, obj):
        user = obj.user
        if user.role == 'tour_manager' and hasattr(user, 'tour_manager_profile') and user.tour_manager_profile.profile_image:
            return user.tour_manager_profile.profile_image.url
        elif user.profile_image:
            return user.profile_image.url
        return None
class TourCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    tour_name = serializers.CharField(source='tour.tour_name', read_only=True)
    profile_image = serializers.SerializerMethodField()

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
            'profile_image',
        ]
        read_only_fields = [
            'user',
            'username',
            'created_at',
            'likes',
            'dislikes',
            'tour_name',
            'profile_image',
        ]

    def get_profile_image(self, obj):
        user = obj.user
        if user.role == 'tour_manager' and hasattr(user, 'tour_manager_profile') and user.tour_manager_profile.profile_image:
            return user.tour_manager_profile.profile_image.url
        elif user.profile_image:
            return user.profile_image.url
        return None
