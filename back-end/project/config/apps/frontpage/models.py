from django.db import models

# Create your models here.
class HeaderImage(models.Model):
    image = models.ImageField(upload_to= 'headers/')
    alt_text = models.CharField(max_length=255)
    show_on_homepage = models.BooleanField(default=False)  

    def __str__(self):
        return self.alt_text