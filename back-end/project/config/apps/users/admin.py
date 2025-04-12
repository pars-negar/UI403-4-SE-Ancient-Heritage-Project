from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'role', 'is_staff']
    fields = ('username', 'password', 'role', 'phone_number', 'email', 'is_verified')
    search_fields = ('username', 'role')
    
admin.site.register(CustomUser, CustomUserAdmin)
