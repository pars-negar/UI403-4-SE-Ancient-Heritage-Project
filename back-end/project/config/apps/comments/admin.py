from django.contrib import admin
from .models import SiteComment

@admin.register(SiteComment)
class SiteCommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'rating', 'created_at', 'is_approved']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['user__username', 'comment']
    actions = ['approve_selected']

    def approve_selected(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f"{updated} نظر تایید شد.")
    approve_selected.short_description = "تأیید نظرات انتخاب‌شده"
