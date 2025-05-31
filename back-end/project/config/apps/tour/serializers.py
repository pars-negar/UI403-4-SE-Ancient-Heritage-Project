from rest_framework import serializers
from .models import Attraction
from .models import Tour

class Attractionserializers(serializers.ModelSerializer):
    class Meta:
        model=Attraction
        fields= '__all__'
        
# Serializer for the Tour model - used for serializing and deserializing Tour instances
class TourSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ['id', 'origin', 'destination', 'start_date', 'end_date', 'price', 'description', 'main_image']  

    def get_price(self, obj):
        return int(obj.price)


# Serializer for filtering Tour objects based on specific criteria
class TourFilterSerializer(serializers.Serializer):
       # Optional field to filter tours by origin city or location
    origin = serializers.CharField(
        required=False,               # This field is not mandatory
        allow_blank=True,            # Allows empty strings (i.e., no filtering if left blank)
        help_text="Enter the origin of the tour. Leave empty if you don't want to filter by origin."
    )

    # Optional field to filter tours by destination city or location
    destination = serializers.CharField(
        required=False,               # This field is not mandatory
        allow_blank=True,            # Allows empty strings
        help_text="Enter the destination of the tour. Leave empty if you don't want to filter by destination."
    )

    # Optional field to filter tours that start on or after a specific date
    start_date = serializers.DateField(
        required=False,               # This field is not required
        allow_null=True,             # Accepts null values (i.e., no filtering if left null)
        help_text="Enter the start date of the tour. Leave it empty if you don't want to filter by start date."
    )

    # Optional field to filter tours that end on or before a specific date
    end_date = serializers.DateField(
        required=False,               # Not mandatory
        allow_null=True,             # Can be null
        help_text="Enter the end date of the tour. Leave it empty if you don't want to filter by end date."
    )


# Serializer for the Attraction model - used for serializing and deserializing Attraction instances
class Attractionserializers(serializers.ModelSerializer):
    class Meta:
        model = Attraction  # Specifies the model to serialize
        fields = ['id', 'attraction_name', 'city', 'historical_period']  # Fields to include




