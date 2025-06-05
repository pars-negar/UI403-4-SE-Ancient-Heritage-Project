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


from apps.tour.utils import search_tours

class TourPageAPIView(APIView):
    def get(self, request):
        origin = request.query_params.get('origin')
        destination = request.query_params.get('destination')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # اگر حداقل یکی از فیلدها ارسال شده باشد، جستجو انجام بده
        if origin or destination or start_date or end_date:
            search_results = search_tours(
                origin=origin,
                destination=destination,
                start_date=start_date,
                end_date=end_date
            )
            data = {
                'search_results': TourSerializer(search_results, many=True).data
            }
        else:
            top_tours = Tour.objects.order_by('-price')[:3]
            recent_tours = Tour.objects.order_by('-start_date')[:3]
            all_tours = Tour.objects.all()

            data = {
                'top_tours': TourSerializer(top_tours, many=True).data,
                'recent_tours': TourSerializer(recent_tours, many=True).data,
                'all_tours': TourSerializer(all_tours, many=True).data,
            }

        return Response(data, status=status.HTTP_200_OK)


from apps.tour.utils import search_attractions 

class AttractionPageAPIView(APIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)

        if search_query:
            # استفاده از تابع ماژولار برای جستجو
            search_results = search_attractions(name=search_query)
            data = {
                'search_results': AttractionSerializer(search_results, many=True).data
            }
        else:
            # نمایش دسته‌بندی‌شده جاذبه‌ها
            featured_attractions = Attraction.objects.filter(category='featured').order_by('-id')[:6]
            hidden_attractions = Attraction.objects.filter(category='hidden').order_by('-id')[:6]
           

            data = {
                'featured': AttractionSerializer(featured_attractions, many=True).data,
                'hidden': AttractionSerializer(hidden_attractions, many=True).data,
            }

        return Response(data, status=status.HTTP_200_OK)



class TourDetailAPIView(RetrieveAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer


class AttractionDetailAPIView(RetrieveAPIView):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
