from django.contrib import admin
from .models import Attraction, Tour

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction_name', 'city', 'entry_fee', 'created_at')
    search_fields = ('attraction_name', 'city')
    list_filter = ('city',)
    readonly_fields = ('created_at',)
    fields = ('attraction_name', 'description', 'location', 'city', 'opening_hours', 'entry_fee', 'image', 'created_at')


class TourAdmin(admin.ModelAdmin):
    list_display = ('tour_name', 'origin', 'destination', 'price', 'start_date', 'end_date')
    search_fields = ('tour_name', 'origin', 'destination')
    list_filter = ('start_date', 'end_date', 'origin', 'destination')
    readonly_fields = ()
    fields = ('tour_name', 'description', 'start_date', 'end_date', 'price', 'capacity', 
              'attractions', 'origin', 'destination', 'departure_location', 'meal_details', 'facilities', 
              'tour_guides', 'accommodation', 'image', 'related_tours')

    filter_horizontal = ('attractions', 'related_tours') 


admin.site.register(Tour, TourAdmin)
admin.site.register(Attraction, AttractionAdmin)