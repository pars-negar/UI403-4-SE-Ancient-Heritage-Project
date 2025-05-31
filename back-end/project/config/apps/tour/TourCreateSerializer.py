# serializers.py

class TourCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'  # یا فقط فیلدهایی که لازم‌ند برای ساخت تور
        read_only_fields = ['tour_manager']  # چون از روی کاربر لاگین‌شده تنظیم می‌کنیم

    def create(self, validated_data):
        # ست کردن مسئول تور به کاربر لاگین‌شده
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['tour_manager'] = request.user
        return super().create(validated_data)
