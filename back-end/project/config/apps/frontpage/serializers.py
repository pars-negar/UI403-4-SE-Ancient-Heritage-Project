from rest_framework import serializers
from apps.tour.models import Attraction
from apps.tour.models import Tour, TourImage
from apps.faq.models import FAQ
from .models import HeaderImage 
from rest_framework import serializers


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'attraction_name', 'description', 'location', 'city', 'image']



class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']


class HeaderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderImage
        fields = ['id', 'image', 'alt_text']