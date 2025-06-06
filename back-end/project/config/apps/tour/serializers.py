from rest_framework import serializers
from django.db.models import Sum
from .models import Attraction
from .models import Tour



class TourCreateSerializer(serializers.ModelSerializer):

    tour_manager = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Tour
        #exclude = ['tour_manager']  # از کاربر گرفته میشه نه از فرانت
        
        fields = '__all__'  # همه فیلدها از جمله tour_manager از فرانت دریافت می‌شن

    def create(self, validated_data):
        # اگر tour_manager از فرانت نیومده بود، از user لاگین‌شده استفاده کن
        if 'tour_manager' not in validated_data:
            request = self.context.get('request')
            if request and request.user.is_authenticated:
                validated_data['tour_manager'] = request.user
        return super().create(validated_data)


# serializers.py

class AttractionImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = AttractionImage
        fields = ['image_type', 'image']


class AttractionSerializer(serializers.ModelSerializer):
    images = AttractionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Attraction
        fields = '__all__'  # یا اگر خواستی دقیق‌تر:
        # fields = ['id', 'attraction_name', ..., 'images']



        
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


