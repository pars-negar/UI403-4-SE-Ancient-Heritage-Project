from rest_framework import serializers
from apps.tour.models import Attraction
from apps.tour.models import Tour
from apps.faq.models import FAQ

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'attraction_name', 'city', 'image']
        
        
class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'tour_name','start_date', 'end_date', 'city', 'image']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']
