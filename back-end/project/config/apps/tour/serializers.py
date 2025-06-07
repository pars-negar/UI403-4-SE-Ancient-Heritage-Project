from rest_framework import serializers
from django.db.models import Sum
from .models import Attraction
from .models import Tour
from .models import AttractionImage,TourImage,DailySchedule,Review


class TourCreateSerializer(serializers.ModelSerializer):

    tour_manager = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Tour
        #exclude = ['tour_manager']  # از کاربر گرفته میشه نه از فرانت
        
        fields = [field.name for field in Tour._meta.fields]


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

class TourImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = TourImage
        fields = ['image_type', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if request and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class AttractionSerializer(serializers.ModelSerializer):
    images = AttractionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Attraction
        fields = '__all__'  # یا اگر خواستی دقیق‌تر:
        # fields = ['id', 'attraction_name', ..., 'images']


class DailyScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySchedule
        fields = ['day_number', 'title', 'description', 'image']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # نمایش نام کاربر

    class Meta:
        model = Review
        fields = ['user', 'comment', 'rating', 'created_at']     
# Serializer for the Tour model - used for serializing and deserializing Tour instances
class TourSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    meals = serializers.SerializerMethodField()
    guides = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    images = TourImageSerializer(many=True, read_only=True)
    daily_schedules = DailyScheduleSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Tour
        fields = [
            'id', 'tour_name', 'origin', 'destination', 'start_date', 'end_date',
            'price', 'description', 'main_image', 'images',
            'meals', 'guides', 'services',
            'daily_schedules', 'reviews',
        ]

    def get_price(self, obj):
        return int(obj.price)
    def get_meals(self, obj):
        if not obj.meal_details:
            return {}
        parts = obj.meal_details.replace('،', ',').split(',')
        result = {}
        for part in parts:
            if 'صبحانه' in part:
                result['breakfast'] = int(''.join(filter(str.isdigit, part)))
            elif 'ناهار' in part:
                result['lunch'] = int(''.join(filter(str.isdigit, part)))
            elif 'شام' in part:
                result['dinner'] = int(''.join(filter(str.isdigit, part)))
        return result
    def get_guides(self, obj):
        if not obj.tour_guides_info:
            return []
        guides = obj.tour_guides_info.split('،')
        result = []
        for guide in guides:
            parts = guide.split('-')
            if len(parts) == 2:
                result.append({
                    "name": parts[0].strip(),
                    "type": parts[1].strip()
                })
        return result
    def get_services(self, obj):
        if not obj.tourism_services:
            return []
        return [s.strip() for s in obj.tourism_services.split('،')]


class DailyScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySchedule
        fields = ['day_number', 'title', 'description', 'image']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # نمایش نام کاربر

    class Meta:
        model = Review
        fields = ['user', 'comment', 'rating', 'created_at']

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


class TourDetailSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    meals = serializers.SerializerMethodField()
    guides = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    images = TourImageSerializer(many=True, read_only=True)
    daily_schedules = DailyScheduleSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    tour_manager = serializers.StringRelatedField()
    related_tours = serializers.StringRelatedField(many=True)

    class Meta:
        model = Tour
        fields = [
            'id', 'tour_name', 'description', 'start_date', 'end_date',
            'departure_time', 'return_time',
            'origin', 'destination', 'price', 'capacity',
            'main_image', 'images',
            'accommodation', 'meal_details', 'meals',
            'transportation', 'travel_insurance',
            'tourism_services', 'services',
            'tour_guides_info', 'guides',
            'daily_schedules', 'reviews',
            'tour_manager',
            'company_name', 'company_address', 'company_phone',
            'company_email', 'company_website',
            'related_tours',
        ]

    def get_price(self, obj):
        return int(obj.price)

    def get_meals(self, obj):
        if not obj.meal_details:
            return {}
        parts = obj.meal_details.replace('،', ',').split(',')
        result = {}
        for part in parts:
            if 'صبحانه' in part:
                result['breakfast'] = int(''.join(filter(str.isdigit, part)))
            elif 'ناهار' in part:
                result['lunch'] = int(''.join(filter(str.isdigit, part)))
            elif 'شام' in part:
                result['dinner'] = int(''.join(filter(str.isdigit, part)))
        return result

    def get_guides(self, obj):
        if not obj.tour_guides_info:
            return []
        guides = obj.tour_guides_info.split('،')
        result = []
        for guide in guides:
            parts = guide.split('-')
            if len(parts) == 2:
                result.append({
                    "name": parts[0].strip(),
                    "type": parts[1].strip()
                })
        return result

    def get_services(self, obj):
        if not obj.tourism_services:
            return []
        return [s.strip() for s in obj.tourism_services.split('،')]

