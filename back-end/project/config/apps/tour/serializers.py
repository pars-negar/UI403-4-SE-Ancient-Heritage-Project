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
        fields = '__all__' 

class TourFilterSerializer(serializers.Serializer):
    origin = serializers.CharField(required=False, allow_blank=True)
    destination = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateField(required=False, allow_null=True)
    end_date = serializers.DateField(required=False, allow_null=True)
