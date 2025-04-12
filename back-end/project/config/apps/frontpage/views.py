from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import HeaderImageSerializer , AttractionSerializer, TourSerializer, FAQSerializer 


from .serializer import AttractionSerializer, TourSerializer, FAQSerializer
from apps.tour.models import Attraction
from apps.tour.models import Tour
from apps.faq.models import FAQ
from .models import HeaderImage
 


class HomePageAPIView(APIView):
    def get(self, request):
        attractions = Attraction.objects.all()[:3]
        tours = Tour.objects.order_by('-start_date')[:3]
        faqs = FAQ.objects.all()[:3]
        headers = HeaderImage.objects.filter(show_on_homepage=True)[:5]  

        data = {
            'attractions': AttractionSerializer(attractions, many=True).data,
            'tours': TourSerializer(tours, many=True).data,
            'faqs': FAQSerializer(faqs, many=True).data,
            'headers': HeaderImageSerializer(headers, many=True).data,  
        }
        return Response(data, status=status.HTTP_200_OK)
print