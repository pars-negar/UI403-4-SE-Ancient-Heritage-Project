from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, TourManagerProfile

class TourManagerProfileInline(admin.StackedInline):
    model = TourManagerProfile
    can_delete = False
    verbose_name_plural = 'اطلاعات شرکت تور'
    fk_name = 'user'  # کلید خارجی به مدل CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'role', 'email', 'phone_number')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('اطلاعات شخصی', {'fields': ('email', 'phone_number', 'role', 'is_verified','profile_image')}),
        ('دسترسی‌ها', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('تاریخ‌ها', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone_number', 'role', 'password1', 'password2'),
        }),
    )
    
    def get_inline_instances(self, request, obj=None):
        if obj and obj.role == 'tour_manager':
            return [TourManagerProfileInline(self.model, self.admin_site)]
        return []

