from rest_framework import serializers
from apps.tour.models import Attraction
from apps.tour.models import Tour, TourImage
from apps.faq.models import FAQ
from .models import HeaderImage 
from rest_framework import serializers
from apps.users.models import CustomUser


class AttractionSerializer(serializers.ModelSerializer):
    historical_period = serializers.SerializerMethodField()

    class Meta:
        model = Attraction
        fields = '__all__'

    def get_historical_period(self, obj):
        return obj.get_historical_period_display()



class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer']


class HeaderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderImage
        fields = ['id', 'image', 'alt_text']