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
        origin = request.GET.get('origin')
        destination = request.GET.get('destination')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        tours = Tour.objects.all()

        if origin:
            tours = tours.filter(origin__icontains=origin)
        if destination:
            tours = tours.filter(destination__icontains=destination)
        if start_date:
            tours = tours.filter(start_date__gte=start_date)
        if end_date:
            tours = tours.filter(end_date__lte=end_date)
            
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


class TourPageAPIView(APIView):
    def get(self, request):
        origin = request.GET.get('origin')
        destination = request.GET.get('destination')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        tours = Tour.objects.all()

        if origin:
            tours = tours.filter(origin__icontains=origin)
        if destination:
            tours = tours.filter(destination__icontains=destination)
        if start_date:
            tours = tours.filter(start_date__gte=start_date)
        if end_date:
            tours = tours.filter(end_date__lte=end_date)
        # تورهای برتر (براساس قیمت یا امتیاز یا هر معیاری که دارید)
        top_tours = Tour.objects.order_by('-price')[:3]
        
        # تورهای اخیر (جدیدترین تورها)
        recent_tours = Tour.objects.order_by('-start_date')[:3]
    
        
        # آماده کردن داده‌ها برای ارسال به فرانت‌اند
        data = {
            'top_tours': TourSerializer(top_tours, many=True).data,
            'recent_tours': TourSerializer(recent_tours, many=True).data,
            'all_tours': TourSerializer(tours, many=True).data,
        }
        
        return Response(data, status=status.HTTP_200_OK)