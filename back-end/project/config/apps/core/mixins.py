from apps.users.serializers import SimpleUserInfoSerializer

class UserInfoAppendMixin:
    def append_user_info(self, response, request):
        if hasattr(response, 'data') and isinstance(response.data, dict):
            user_serializer = SimpleUserInfoSerializer(request.user, context={'request': request})
            response.data['user_info'] = user_serializer.data
        return response