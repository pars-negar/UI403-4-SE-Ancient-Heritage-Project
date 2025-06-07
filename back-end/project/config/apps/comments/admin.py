from django.contrib import admin
from .models import SiteComment, TourComment


@admin.register(SiteComment)
class SiteCommentAdmin(admin.ModelAdmin):
    list_display = ('user_display', 'user_role_display', 'rating', 'created_at')
    list_filter = ('user_role', 'rating', 'created_at')
    search_fields = ('user__username', 'user__email', 'comment')
    readonly_fields = ('created_at',)

    def user_display(self, obj):
        return obj.user.username if obj.user else "کاربر حذف‌شده"
    user_display.short_description = "نام کاربر"

    def user_role_display(self, obj):
        return dict(SiteComment.ROLE_CHOICES).get(obj.user_role, 'نامشخص')
    user_role_display.short_description = "نقش"


@admin.register(TourComment)
class TourCommentAdmin(admin.ModelAdmin):
    list_display = ('user_display', 'tour', 'rating', 'trip_date', 'created_at', 'likes', 'dislikes')
    list_filter = ('rating', 'trip_date', 'created_at')
    search_fields = ('user__username', 'user__email', 'tour__tour_name', 'comment')
    readonly_fields = ('created_at',)

    def user_display(self, obj):
        return obj.user.username if obj.user else "کاربر حذف‌شده"
    user_display.short_description = "نام کاربر"
