from rest_framework import serializers
from .models import Attraction
from .models import Tour


class Attractionserializers(serializers.ModelSerializer):
    class Meta:
        model=Attraction
        fields= '__all__'
        

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['id', 'origin', 'destination', 'start_date', 'end_date', 'price', 'description']

class TourFilterSerializer(serializers.Serializer):
    origin = serializers.CharField(
        required=False, 
        allow_blank=True, 
        help_text="مبدا تور را وارد کنید. اگر نمی‌خواهید فیلتر کنید، این فیلد را خالی بگذارید."
    )
    destination = serializers.CharField(
        required=False, 
        allow_blank=True, 
        help_text="مقصد تور را وارد کنید. اگر نمی‌خواهید فیلتر کنید، این فیلد را خالی بگذارید."
    )
    start_date = serializers.DateField(
        required=False, 
        allow_null=True, 
        help_text="تاریخ شروع تور را وارد کنید. اگر تاریخ شروع را وارد نکنید، فیلتر نخواهد شد."
    )
    end_date = serializers.DateField(
        required=False, 
        allow_null=True, 
        help_text="تاریخ پایان تور را وارد کنید. اگر تاریخ پایان را وارد نکنید، فیلتر نخواهد شد."
    )



class Attractionserializers(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'attraction_name', 'city', 'historical_period']
