from django.db import models
from apps.users.models import CustomUser  


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
    
    def __str__(self):
        return self.attraction_name


class Tour(models.Model):
    tour_name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price= models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.IntegerField()
    attractions = models.ManyToManyField(Attraction, related_name="tours")
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    departure_location = models.CharField(max_length=255, blank=True, null=True)
    meal_details = models.TextField(blank=True, null=True)
    transportation = models.TextField(blank=True, null=True)
    tour_guides_info = models.TextField(blank=True, null=True, help_text="نام و تخصص و شغل راهنمایان تور را وارد کنید.")
    accommodation = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='tours/', blank=True, null=True)
    
    related_tours = models.ManyToManyField(
        'self',
        symmetrical=False,
        blank=True,
        related_name='similar_tours',
        help_text='تورهایی که از نظر مقصد، قیمت یا خدمات مشابه این تور هستند.'
    )

    company_name = models.CharField(max_length=255)
    company_address = models.TextField(blank=True, null=True)
    company_phone = models.CharField(max_length=50, blank=True, null=True)
    company_email = models.EmailField(blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)

    travel_insurance = models.TextField(blank=True, null=True)
    tourism_services = models.TextField(blank=True, null=True)
    daily_schedule = models.TextField(blank=True, null=True)

    tour_manager = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL, 
        related_name='managed_tours', 
        null=True, 
        blank=True
    )

    def __str__(self):
        return self.tour_name


class TourImage(models.Model):
    SECTION_CHOICES = [
        ('header', 'تصویر اصلی بالا'),
        ('daily_schedule', 'برنامه روزانه'),
        ('facilities', 'امکانات'),
        ('description', 'توضیحات تور'),
        ('other', 'سایر'),
    ]

    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='tour_images/')
    section = models.CharField(max_length=50, choices=SECTION_CHOICES)
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.tour.tour_name} - {self.section}"


class DailySchedule(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='daily_schedules')
    day_number = models.PositiveIntegerField(help_text='روز چندم تور؟')
    title = models.CharField(max_length=255, help_text='عنوان یا خلاصه روز مثلاً "روز اول"')
    description = models.TextField()
    image = models.ImageField(upload_to='daily_schedules/', blank=True, null=True)

    def __str__(self):
        return f"{self.tour.tour_name} - روز {self.day_number}"
