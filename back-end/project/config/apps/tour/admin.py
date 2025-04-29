from django import forms
from django.contrib import admin
from jalali_date.admin import ModelAdminJalaliMixin
from jalali_date.widgets import AdminJalaliDateWidget
from .models import Attraction, Tour ,DailySchedule

class TourAdminForm(forms.ModelForm):
    class Meta:
        model = Tour
        fields = '__all__'
        widgets = {
            'start_date': AdminJalaliDateWidget,  
            'end_date': AdminJalaliDateWidget,    
            'departure_time': forms.TimeInput(format='%H:%M'),  
            'return_time': forms.TimeInput(format='%H:%M'),     
        }

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction_name', 'city', 'historical_period', 'entry_fee')
    search_fields = ('attraction_name', 'city')
    list_filter = ('city',)
    fields = (
        'attraction_name', 'description', 'location', 'city', 'historical_period',
        'opening_hours', 'entry_fee', 'image', 
    )

class TourAdmin(ModelAdminJalaliMixin, admin.ModelAdmin): 
    form = TourAdminForm
    list_display = (
        'tour_name', 'price', 'start_date', 'end_date', 'capacity', 'tour_manager'
    )
    search_fields = ('tour_name', 'tour_manager__username', 'origin', 'destination')
    list_filter = ('start_date', 'end_date', 'tour_manager', 'related_tours')
    fields = (
        'tour_name', 'description', 'main_image', 'price', 'capacity',
        'start_date', 'end_date', 'departure_time', 'return_time', 'origin', 'destination',
        'meal_details', 'transportation', 'tour_guides_info', 'accommodation',
        'company_name', 'company_address', 'company_phone', 'company_email',
        'company_website', 'travel_insurance', 'tourism_services',
        'related_tours', 'tour_manager' , 
    )
class DailyScheduleAdmin(admin.ModelAdmin):
    list_display = ('tour', 'day_number', 'title', 'description')
    search_fields = ('tour__tour_name', 'title')
    list_filter = ('tour', 'day_number')
    fields = ('tour', 'day_number', 'title', 'description', 'image')

admin.site.register(DailySchedule, DailyScheduleAdmin)

admin.site.register(Attraction, AttractionAdmin)
admin.site.register(Tour, TourAdmin)
