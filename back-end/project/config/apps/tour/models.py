from django.db import models


class Attraction(models.Model):
    attraction_name = models.CharField(max_length=255)  
    description = models.TextField() 
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=255)  
    opening_hours = models.CharField(max_length=100, blank=True)  
    entry_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True) 
    image = models.ImageField(upload_to='attractions/', blank=True, null=True)   
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.attraction_name


class Tour(models.Model):
    tour_name = models.CharField(max_length=255)  
    description = models.TextField()   
    start_date = models.DateTimeField() 
    end_date = models.DateTimeField()    
    price = models.DecimalField(max_digits=10, decimal_places=2)   
    capacity = models.IntegerField()   
    attractions = models.ManyToManyField(Attraction, related_name="tours")   
    origin = models.CharField(max_length=255)  
    destination = models.CharField(max_length=255)  
    departure_location = models.CharField(max_length=255, blank=True, null=True)   
    meal_details = models.TextField(blank=True, null=True)  
    facilities = models.TextField(blank=True, null=True)  
    tour_guides = models.TextField(blank=True, null=True) 
    accommodation = models.TextField(blank=True, null=True) 
    image = models.ImageField(upload_to='tours/', blank=True, null=True)  
    related_tours = models.ManyToManyField('self', blank=True)  


    def __str__(self):
        return self.tour_name


