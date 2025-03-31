from django.contrib import admin
from .models import Tour , Attraction


class TourAdmin(admin.ModelAdmin):
    list_display = ('tour_name', 'origin', 'destination', 'start_date', 'end_date', 'tour_time', 'price', 'capacity')  
    search_fields = ('tour_name', 'origin', 'destination')  
    list_filter = ('start_date', 'end_date', 'origin', 'destination')  
    ordering = ('start_date',)  

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction_name', 'city', 'location', 'opening_hours', 'entry_fee')  
    search_fields = ('attraction_name', 'city')  
    list_filter = ('city',)  


admin.site.register(Tour, TourAdmin)
admin.site.register(Attraction, AttractionAdmin)
