from rest_framework import serializers
from apps.tour.models import Attraction
from apps.tour.models import Tour
from apps.faq.models import FAQ
from .models import HeaderImage 

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'attraction_name', 'description', 'location', 'city', 'image']

class TourSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ['id', 'origin', 'destination', 'start_date', 'end_date', 'price', 'description', 'main_image']  # تغییر از 'image' به 'main_image'

    def get_price(self, obj):
        return int(obj.price)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']


class HeaderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderImage
        fields = ['id', 'image', 'alt_text']