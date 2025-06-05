from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView

from .serializer import  AttractionSerializer, TourSerializer
from apps.tour.models import Attraction, Tour
from apps.faq.models import FAQ


class HomePageAPIView(APIView):
    def get(self, request):
        attractions_qs = Attraction.objects.values('id', 'attraction_name')[:6]

        attractions = []
        for attr in attractions_qs:
            full_name = attr['attraction_name']
            parts = full_name.split('؛', 1)
            title = parts[0].strip()
            subtitle = parts[1].strip() if len(parts) > 1 else ''
            attractions.append({
                'id': attr['id'],        # اضافه شده
                'title': title,
                'subtitle': subtitle,
            })

        tours_qs = Tour.objects.order_by('-start_date').values('id', 'destination', 'price', 'start_date', 'end_date')[:6]
        
        tours = []
        for t in tours_qs:
            price = int(t['price'])
            duration = (t['end_date'] - t['start_date']).days if t['end_date'] and t['start_date'] else 0
            
            tours.append({
                'id': t['id'],
                'destination': t['destination'],
                'price': price,
                'duration': duration,
            })

       

        data = {
            'attractions': attractions,
            'tours': tours,
        }
        return Response(data, status=status.HTTP_200_OK)


class TourPageAPIView(APIView):
    def get(self, request):
        top_tours = Tour.objects.order_by('-price')[:3]
        recent_tours = Tour.objects.order_by('-start_date')[:3]
        all_tours = Tour.objects.all()
        
        data = {
            'top_tours': TourSerializer(top_tours, many=True).data,
            'recent_tours': TourSerializer(recent_tours, many=True).data,
            'all_tours': TourSerializer(all_tours, many=True).data,
        }
        
        return Response(data, status=status.HTTP_200_OK)


class AttractionPageAPIView(APIView):
    def get(self,request):
        pass
    
class TourDetailAPIView(RetrieveAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer


class AttractionDetailAPIView(RetrieveAPIView):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
