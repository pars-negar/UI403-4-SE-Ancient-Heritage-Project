from django.contrib import admin
from .models import Attraction, Tour

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction_name', 'city','historical_period', 'entry_fee'  )
    search_fields = ('attraction_name', 'city')
    list_filter = ('city',)
    fields = (
        'attraction_name', 'description', 'location', 'city', 'historical_period',
        'opening_hours', 'entry_fee', 'image', 
    )

class TourAdmin(admin.ModelAdmin):
    list_display = (
        'tour_name', 'price', 'start_date', 'end_date', 'capacity', 'tour_manager'
    )
    search_fields = ('tour_name', 'tour_manager__username', 'origin', 'destination')
    list_filter = ('start_date', 'end_date', 'tour_manager', 'related_tours')
    fields = (
        'tour_name', 'description', 'main_image', 'price', 'capacity',
        'start_date', 'end_date', 'origin', 'destination',
        'meal_details', 'transportation', 'tour_guides_info', 'accommodation',
        'company_name', 'company_address', 'company_phone', 'company_email',
        'company_website', 'travel_insurance', 'tourism_services',
        'related_tours', 'tour_manager'

    )

admin.site.register(Attraction, AttractionAdmin)
admin.site.register(Tour, TourAdmin)
