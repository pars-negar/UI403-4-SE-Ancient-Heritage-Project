from django.shortcuts import render
from django.shortcuts import get_object_or_404 # اینم اضاف شد
from .models import TourRegistration # این اضافه شد 
from .serializers import Attractionserializers , TourFilterSerializer, TourSerializer , TourRegistrationSerializer # این اضافه شد
from .models import Attraction
from rest_framework import viewsets , status
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from rest_framework import status
from .models import Tour
from rest_framework.views import APIView
from .serializers import TourCreateSerializer
from rest_framework.permissions import IsAuthenticated

from .models import TourRegistration
from .serializers import TourRegistrationSerializer
from django.shortcuts import get_object_or_404

class TourRegisterAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, tour_id):
        tour = get_object_or_404(Tour, id=tour_id)

        if tour.is_expired(): # اینم اضافه شد
            return Response({"detail": "زمان ثبت‌نام این تور به پایان رسیده است."}, status=status.HTTP_400_BAD_REQUEST)


        # چک کنیم آیا قبلاً ثبت‌نام کرده یا نه
        if TourRegistration.objects.filter(user=request.user, tour=tour).exists():
            return Response({"detail": "شما قبلاً در این تور ثبت‌نام کرده‌اید."}, status=status.HTTP_400_BAD_REQUEST)
        


        #  اضافه شد این) . بررسی تداخل زمانی با سایر تورها()
        start_date = tour.start_date
        end_date = tour.end_date
        conflict = TourRegistration.objects.filter(
            user=request.user,
            tour__start_date__lt=end_date,
            tour__end_date__gt=start_date
        )


        if conflict.exists():
            return Response(
                {"detail": "در این بازه زمانی، شما در تور دیگری ثبت‌نام کرده‌اید."},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        # چک ظرفیت( این جدید اصافه شد)
        current_registrations = TourRegistration.objects.filter(tour=tour).count()
        if current_registrations >= tour.capacity:
            return Response(
                {"detail": "ظرفیت این تور پر شده و امکان ثبت‌نام وجود ندارد."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ثبت نام جدید
        registration = TourRegistration.objects.create(user=request.user, tour=tour)
        serializer = TourRegistrationSerializer(registration)
        return Response(serializer.data, status=status.HTTP_201_CREATED)





class AttractionViewSet(viewsets.ModelViewSet):

    queryset = Attraction.objects.all()
    serializer_class = Attractionserializers


# View to handle filtered search of tours based on user input
class TourSearchView(APIView):
    def post(self, request):
        # Deserialize and validate incoming data using TourFilterSerializer
        serializer = TourFilterSerializer(data=request.data)

        if serializer.is_valid():
            filters = serializer.validated_data  # Extract validated filter data
            queryset = Tour.objects.all()  # Start with all tours

            # Apply filters if provided
            if filters.get('origin'):
                queryset = queryset.filter(origin=filters['origin'])

            if filters.get('destination'):
                queryset = queryset.filter(destination=filters['destination'])

            if filters.get('start_date'):
                queryset = queryset.filter(start_date__gte=filters['start_date'])  # Tours starting on or after

            if filters.get('end_date'):
                queryset = queryset.filter(end_date__lte=filters['end_date'])  # Tours ending on or before

            # If no matching tours found, return a 404 response
            if not queryset.exists():
                return Response({"message": "No tours found matching your criteria."}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the filtered tours
            tour_serializer = TourSerializer(queryset, many=True)
            return Response(tour_serializer.data)

        # If input data is invalid, return 400 with error details
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View to handle filtered search of attractions based on optional criteria
class AttractionSearchAPIView(APIView):
    def post(self, request):
        # Extract filters from request body
        name = request.data.get('name', None)
        city = request.data.get('city', None)
        historical_period = request.data.get('historical_period', None)

        queryset = Attraction.objects.all()  # Start with all attractions

        # Apply filters if present
        if name:
            queryset = queryset.filter(attraction_name__icontains=name)  # Partial match (case-insensitive)

        if city:
            queryset = queryset.filter(city__icontains=city)

        if historical_period:
            queryset = queryset.filter(historical_period=historical_period)

        # If any results match, return them
        if queryset.exists():
            serializer = Attractionserializers(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"message": "No attractions found matching your criteria."},
                status=status.HTTP_404_NOT_FOUND
            )
        
# **اینجا ویو جدید برای ثبت تور (CreateTourAPIView) رو اضافه می‌کنیم به جای تابع create_tour**

class CreateTourAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = TourCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(tour_manager=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 