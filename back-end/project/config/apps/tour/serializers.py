from rest_framework import serializers
from .models import Attraction

class Attractionserializers(serializers.ModelSerializer):
    class Meta:
        model=Attraction
        fields= '__all__'
        
        