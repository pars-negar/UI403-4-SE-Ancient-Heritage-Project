from rest_framework import serializers
from django.db.models import Sum
from .models import Attraction
from .models import Tour
from .models import AttractionImage,TourImage,DailySchedule,Review
from apps.users.models import TourManagerProfile

from rest_framework import serializers
from .models import Tour, TourImage, DailySchedule

class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'image', 'image_type']

class DailyScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySchedule
        fields = ['id', 'day_number', 'title', 'description', 'image']

class TourCreateSerializer(serializers.ModelSerializer):
    tour_manager = serializers.PrimaryKeyRelatedField(read_only=True)
    attractions = serializers.PrimaryKeyRelatedField(many=True, queryset=Attraction.objects.all())
    tour_guides_info = serializers.JSONField(required=False)  # چون TextField ذخیره میکنه، اینجا JSON میگیریم
    images = TourImageSerializer(many=True, required=False)
    daily_schedules = DailyScheduleSerializer(many=True, required=False)

    class Meta:
        model = Tour
        fields = [field.name for field in Tour._meta.fields if field.name != 'related_tours'] + ['images', 'daily_schedules', 'attractions']

    def validate(self, data):
        start = data.get('start_date')
        end = data.get('end_date')
        if start and end and end < start:
            raise serializers.ValidationError("تاریخ بازگشت نمی‌تواند قبل از تاریخ شروع باشد.")
        return data

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        schedules_data = validated_data.pop('daily_schedules', [])
        attractions_data = validated_data.pop('attractions', [])

        # کاربر رو از کانتکست میگیریم و ست میکنیم
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['tour_manager'] = request.user

        # ساخت تور اصلی
        tour = Tour.objects.create(**validated_data)

        # افزودن جاذبه‌ها (M2M) - اگر آی‌دی بودن، باید دوباره کوئری کنیم
        tour.attractions.set(attractions_data)

        # افزودن تصاویر
        for image_data in images_data:
            TourImage.objects.create(tour=tour, **image_data)

        # افزودن برنامه‌های روزانه
        for schedule_data in schedules_data:
            DailySchedule.objects.create(tour=tour, **schedule_data)

        return tour

class TourUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = [
            'tour_name', 'description', 'start_date', 'end_date', 'departure_time', 'return_time',
            'price', 'capacity', 'origin', 'destination', 'main_image', 'accommodation', 'meal_details',
            'transportation', 'travel_insurance', 'tourism_services', 'tour_guides_info',
            'company_name', 'company_address', 'company_phone', 'company_email', 'company_website',
        ]


class TourListSerializer(serializers.ModelSerializer):
    card2_image = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ['id', 'tour_name', 'destination', 'start_date', 'end_date', 'price', 'card2_image','duration',]

    def get_card2_image(self, obj):
        image = obj.images.filter(image_type='card2').first()
        if image and image.image:
            request = self.context.get('request')
            return request.build_absolute_uri(image.image.url) if request else image.image.url
        return None

    duration = serializers.SerializerMethodField()

    def get_duration(self, obj):
        if obj.start_date and obj.end_date:
            return (obj.end_date - obj.start_date).days + 1  
        return None


class TourDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    daily_schedules = serializers.SerializerMethodField()
    tour_manager_profile = serializers.SerializerMethodField()
    tour_guides = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    attractions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Tour
        fields = '__all__' 
    
    def get_duration(self, obj):
        return obj.duration

    def get_images(self, obj):
        request = self.context.get('request')
        return [
            {
                'id': img.id,
                'image_type': img.image_type,
                'image_url': request.build_absolute_uri(img.image.url) if request else img.image.url
            } for img in obj.images.all()
        ]

    def get_daily_schedules(self, obj):
        request = self.context.get('request')
        return [
            {
                'day_number': sch.day_number,
                'title': sch.title,
                'description': sch.description,
                'image': request.build_absolute_uri(sch.image.url) if sch.image and request else None,
            } for sch in obj.daily_schedules.all().order_by('day_number')
        ]

    def get_tour_manager_profile(self, obj):
        user = obj.tour_manager
        if user and hasattr(user, 'tour_manager_profile'):
            profile = user.tour_manager_profile
            return {
                'user': {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                },
                'company_name': profile.company_name,
                'company_address': profile.company_address,
                'company_registration_number': profile.company_registration_number,
            }
        return None

    def get_tour_guides(self, obj):
        if obj.tour_guides_info:
            return [g.strip() for g in obj.tour_guides_info.splitlines() if g.strip()]
        return []


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
    historical_period = serializers.SerializerMethodField()

    class Meta:
        model = Attraction
        fields = '__all__'

    def get_historical_period(self, obj):
        return obj.get_historical_period_display()


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

class TourManagerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourManagerProfile
        fields = [
            'company_name',
            'company_address',
            'company_registration_number',
            'profile_image',
            'company_phone_number',
            'first_name_fa',
            'last_name_fa',
        ]

class TourSerializer(serializers.ModelSerializer):
    # فیلدهای فعلی
    price = serializers.IntegerField(required=True)
    meals = serializers.JSONField(required=False)
    guides = serializers.JSONField(required=False)
    services = serializers.ListField(child=serializers.CharField(), required=False)
    attractions = serializers.StringRelatedField(many=True)
    images = TourImageSerializer(many=True, read_only=True)
    daily_schedules = DailyScheduleSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    duration = serializers.SerializerMethodField()
    # اضافه کردن فیلد مربوط به پروفایل مسئول تور
    tour_manager_profile = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = '__all__' 
        
    def get_duration(self, obj):
        return obj.duration

    def get_tour_manager_profile(self, obj):
        if obj.tour_manager and hasattr(obj.tour_manager, 'tour_manager_profile'):
            profile = obj.tour_manager.tour_manager_profile
            return TourManagerProfileSerializer(profile).data
        return None

    def create(self, validated_data):
        meals = validated_data.pop('meals', None)
        guides = validated_data.pop('guides', None)
        services = validated_data.pop('services', None)

        if meals:
            validated_data['meal_details'] = self.meals_dict_to_string(meals)
        if guides:
            validated_data['tour_guides_info'] = self.guides_list_to_string(guides)
        if services:
            validated_data['tourism_services'] = '،'.join(services)

        tour = Tour.objects.create(**validated_data)
        return tour

    def update(self, instance, validated_data):
        meals = validated_data.pop('meals', None)
        guides = validated_data.pop('guides', None)
        services = validated_data.pop('services', None)

        if meals:
            instance.meal_details = self.meals_dict_to_string(meals)
        if guides:
            instance.tour_guides_info = self.guides_list_to_string(guides)
        if services:
            instance.tourism_services = '،'.join(services)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def meals_dict_to_string(self, meals):
        parts = []
        if 'breakfast' in meals:
            parts.append(f"صبحانه {meals['breakfast']}")
        if 'lunch' in meals:
            parts.append(f"ناهار {meals['lunch']}")
        if 'dinner' in meals:
            parts.append(f"شام {meals['dinner']}")
        return '،'.join(parts)

    def guides_list_to_string(self, guides):
        parts = []
        for guide in guides:
            parts.append(f"{guide['name']} - {guide['type']}")
        return '،'.join(parts)
    





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

