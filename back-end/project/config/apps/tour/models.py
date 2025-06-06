from django.db import models
from apps.users.models import CustomUser  
import django_jalali.db.models as jmodels




class Attraction(models.Model):
    # Define the available historical period choices as (value, display name) tuples
    PERIOD_CHOICES = [
        ('Ilamian', 'ایلامیان'),
        ('Achaemenid', 'هخامنشیان'),
        ('Ilkhanid', 'ایلخانیان'),
        ('Parthian', 'اشکانیان'),
        ('Timurid', 'تیموریان'),
        ('Sassanid', 'ساسانیان'),
        ('Safavid', 'صفویان'),
        ('Seljuk', 'سلجوقیان'),
        ('Qajar', 'قاجار'),
        ('Uncertain' , 'نامشخص')
    ]
     # Field to store the historical period of the attraction, limited to predefined choices. Default is 'Uncertain'.
    historical_period  = models.CharField(max_length=20, choices=PERIOD_CHOICES, default='Uncertain')
    attraction_name = models.CharField(max_length=255)  
    description = models.TextField() 
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=255)  
    opening_hours = models.CharField(max_length=100, blank=True)  
    entry_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True) 
    image = models.ImageField(upload_to='attractions/', blank=True, null=True)   
    built_date = models.CharField(max_length=100, null=True, blank=True)
    
    CATEGORY_CHOICES = [
        ('featured', 'پربازدید'),
        ('hidden', 'کمتر شناخته‌شده'),
        ('normal', 'معمولی')
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='normal')


    def __str__(self):
        return self.attraction_name



class AttractionImage(models.Model):
    IMAGE_TYPE_CHOICES = [
        ('thumbnail', ' 1تصویر کارت'),
        ('detail', 'تصویر صفحه جزئیات'),
        ('card2', 'تصویر کارت2'),
    ]

    attraction = models.ForeignKey(Attraction, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='attractions/images/')
    image_type = models.CharField(max_length=20, choices=IMAGE_TYPE_CHOICES)

    def __str__(self):
        return f"{self.attraction.attraction_name} - {self.image_type}"

class Tour(models.Model):
    tour_name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = jmodels.jDateField(verbose_name="تاریخ شروع")
    end_date= jmodels.jDateField(verbose_name="تاریخ بازگشت")
    departure_time = models.TimeField(null=True, blank=True, verbose_name="ساعت حرکت")
    return_time = models.TimeField(null=True, blank=True, verbose_name="ساعت برگشت")
    attractions = models.ManyToManyField(Attraction, related_name="tours")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.PositiveIntegerField()
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    main_image = models.ImageField(upload_to='tours/', null=True, blank=True)

    accommodation = models.TextField(blank=True, null=True)
    meal_details = models.TextField(blank=True, null=True)
    transportation = models.TextField(blank=True, null=True)
    travel_insurance = models.TextField(blank=True, null=True)
    tourism_services = models.TextField(blank=True, null=True)
    tour_guides_info = models.TextField(blank=True, null=True)

    tour_manager = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_tours'
    )

    company_name = models.CharField(max_length=255)
    company_address = models.TextField(blank=True, null=True)
    company_phone = models.CharField(max_length=50, blank=True, null=True)
    company_email = models.EmailField(blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)

    related_tours = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='similar_tours')

    def __str__(self):
        return self.tour_name


class DailySchedule(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='daily_schedules')
    day_number = models.PositiveIntegerField()
    title = models.CharField(max_length=255, help_text='مثلاً روز اول')
    description = models.TextField()
    image = models.ImageField(upload_to='daily_schedules/', null=True, blank=True)

    def __str__(self):
        return f"{self.tour.tour_name} - {self.title}"



class Review(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    comment = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user} - {self.tour.tour_name}"



