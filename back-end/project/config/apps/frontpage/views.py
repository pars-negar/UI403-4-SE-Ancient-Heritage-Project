from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from .serializers import  AttractionSerializer
from apps.tour.serializers import (TourSerializer, TourListSerializer, TourDetailSerializer,
                                    TourUpdateSerializer, TourCreateSerializer)
from apps.tour.models import Attraction, Tour
from apps.faq.models import FAQ
from apps.users.permissions import *
from rest_framework.permissions import *
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from rest_framework import generics, permissions
from apps.reserve.models import Passenger
from apps.reserve.serializers import TourPassengerSerializer

class CreateTourAPIView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(tour_manager=self.request.user)

class RegisteredPassengersListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, tour_id):
        try:
            tour = Tour.objects.get(id=tour_id)
        except Tour.DoesNotExist:
            return Response({"detail": "تور یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        if tour.tour_manager != request.user:
            return Response({"detail": "شما اجازه دسترسی به این تور را ندارید."}, status=status.HTTP_403_FORBIDDEN)

        passengers = Passenger.objects.filter(reservation__tour=tour).select_related('reservation')

        serializer = TourPassengerSerializer(passengers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TourSoftDeleteAPIView(APIView):  
                                #  نحوه ارسال درخواست از سمت فرانت    
                                #  POST /api/my-tours/delete/
                                # {
                                #   "tour_id": 5
                                # }
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):  
        tour_id = request.data.get('tour_id')
        try:
            tour = Tour.objects.get(id=tour_id)
        except Tour.DoesNotExist:
            return Response({"detail": "تور یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        if tour.tour_manager != request.user:
            return Response({"detail": "شما اجازه حذف این تور را ندارید."}, status=status.HTTP_403_FORBIDDEN)

        tour.delete()
        return Response({"detail": "تور با موفقیت حذف شد."}, status=status.HTTP_200_OK)



class IsTourManagerAndOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.role == 'tour_manager' and obj.tour_manager == request.user

class TourUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsTourManagerAndOwner]

    def get_queryset(self):
        return Tour.objects.filter(tour_manager=self.request.user)


class TourListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'tour_manager':
            return Response({'detail': 'دسترسی غیرمجاز'}, status=status.HTTP_403_FORBIDDEN)

        today = now().date()
        upcoming_tours = Tour.objects.filter(tour_manager=user, start_date__gte=today).order_by('start_date')
        past_tours = Tour.objects.filter(tour_manager=user, start_date__lt=today).order_by('-start_date')

        upcoming_serializer = TourListSerializer(upcoming_tours, many=True, context={'request': request})
        past_serializer = TourListSerializer(past_tours, many=True, context={'request': request})

        return Response({
            'upcoming_tours': upcoming_serializer.data,
            'past_tours': past_serializer.data,
        })


class TourDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        try:
            tour = Tour.objects.get(pk=pk, tour_manager=user)
        except Tour.DoesNotExist:
            return Response({'detail': 'تور پیدا نشد یا دسترسی ندارید'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TourDetailSerializer(tour, context={'request': request})
        return Response(serializer.data)



class HomePageAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # ====== Attractions ======
        attractions_qs = Attraction.objects.all()[:6]
        attractions = []

        for attr in attractions_qs:
            full_name = attr.attraction_name
            parts = full_name.split('؛', 1)
            title = parts[0].strip()
            subtitle = parts[1].strip() if len(parts) > 1 else ''

            thumbnail = attr.images.filter(image_type='thumbnail').first()
            image_url = request.build_absolute_uri(thumbnail.image.url) if thumbnail else None

            attractions.append({
                'id': attr.id,
                'title': title,
                'subtitle': subtitle,
                'image': image_url,
            })

        # ====== Tour Search Parameters ======
        origin = request.query_params.get('origin')
        destination = request.query_params.get('destination')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if origin or destination or start_date or end_date:
            # ====== Search Tours ======
            tours_qs = search_tours(
                origin=origin,
                destination=destination,
                start_date=start_date,
                end_date=end_date
            )[:6]
        else:
            # ====== Default Tours (latest 6) ======
            tours_qs = Tour.objects.order_by('-start_date')[:6]

        tours = []
        for tour in tours_qs:
            thumbnail = tour.images.filter(image_type='thumbnail').first()
            image_url = request.build_absolute_uri(thumbnail.image.url) if thumbnail else None

            tours.append({
                'id': tour.id,
                'destination': tour.destination,
                'price': int(tour.price),
                'start_date': tour.start_date.isoformat() if tour.start_date else None,
                'end_date': tour.end_date.isoformat() if tour.end_date else None,
                'image': image_url,
            })

        return Response({
            'attractions': attractions,
            'tours': tours,
        }, status=status.HTTP_200_OK)


from apps.tour.utils import search_tours

class TourPageAPIView(APIView):
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

    def format_attraction(self, request, queryset):
        formatted = []
        for attr in queryset:
            full_name = attr.attraction_name
            parts = full_name.split('؛', 1)
            title = parts[0].strip()
            subtitle = parts[1].strip() if len(parts) > 1 else ''

            thumbnail = attr.images.filter(image_type='card2').first()
            image_url = request.build_absolute_uri(thumbnail.image.url) if thumbnail else None

            formatted.append({
                'id': attr.id,
                'title': title,
                'subtitle': subtitle,
                'image': image_url,
            })
        return formatted

    def get(self, request):
        search_query = request.query_params.get('search', None)
        city = request.query_params.get('city', None)
        historical_period = request.query_params.get('historical_period', None)

        if not (search_query or city or historical_period):
            featured = Attraction.objects.filter(category='featured').order_by('-id')[:6]
            hidden = Attraction.objects.filter(category='hidden').order_by('-id')[:6]

            data = {
                'featured': self.format_attraction(request, featured),
                'hidden': self.format_attraction(request, hidden),
            }
        else:
            results = search_attractions(
                name=search_query,
                city=city,
                historical_period=historical_period
            ).order_by('-id')
            data = {
                'search_results': self.format_attraction(request, results)
            }

        return Response(data, status=status.HTTP_200_OK)


class TourDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Tour.objects.all()
    serializer_class = TourSerializer

class AttractionDetailAPIView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response


from apps.tour.models import Attraction

@api_view(['GET'])
def get_cities_with_places(request):
    cities = Attraction.objects.values_list('city', flat=True).distinct()
    return Response(cities)


@api_view(['GET'])
def get_origins_and_destinations(request):
    origins = Tour.objects.values_list('origin', flat=True).distinct()
    destinations = Tour.objects.values_list('destination', flat=True).distinct()
    
    return Response({
        "origins": list(origins),
        "destinations": list(destinations),
    })