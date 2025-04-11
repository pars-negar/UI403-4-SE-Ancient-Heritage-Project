from rest_framework import serializers
from tour.models import Attraction
from tours.models import Tour
from faq.models import FAQ

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'title', 'city', 'image']

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'title', 'start_date', 'end_date', 'city', 'image']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']
