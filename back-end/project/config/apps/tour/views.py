from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Attraction, Tour, TourRegistration
from .serializers import (
    Attractionserializers,
    TourFilterSerializer,
    TourSerializer,
    TourCreateSerializer,
    TourRegistrationSerializer,
)
from rest_framework.permissions import IsAuthenticated


# --------------------- Attraction ---------------------
class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = Attractionserializers


class AttractionSearchAPIView(APIView):
    def post(self, request):
        name = request.data.get('name')
        city = request.data.get('city')
        historical_period = request.data.get('historical_period')

        queryset = Attraction.objects.all()

        if name:
            queryset = queryset.filter(attraction_name__icontains=name)
        if city:
            queryset = queryset.filter(city__icontains=city)
        if historical_period:
            queryset = queryset.filter(historical_period=historical_period)

        if queryset.exists():
            serializer = Attractionserializers(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"message": "No attractions found matching your criteria."},
                status=status.HTTP_404_NOT_FOUND
            )


# --------------------- Tour ---------------------
class TourSearchView(APIView):
    def post(self, request):
        serializer = TourFilterSerializer(data=request.data)
        if serializer.is_valid():
            filters = serializer.validated_data
            queryset = Tour.objects.all()

            if filters.get('origin'):
                queryset = queryset.filter(origin=filters['origin'])
            if filters.get('destination'):
                queryset = queryset.filter(destination=filters['destination'])
            if filters.get('start_date'):
                queryset = queryset.filter(start_date__gte=filters['start_date'])
            if filters.get('end_date'):
                queryset = queryset.filter(end_date__lte=filters['end_date'])

            if not queryset.exists():
                return Response(
                    {"message": "No tours found matching your criteria."},
                    status=status.HTTP_404_NOT_FOUND
                )

            tour_serializer = TourSerializer(queryset, many=True)
            return Response(tour_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateTourAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TourCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(tour_manager=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --------------------- Tour Registration ---------------------
class TourRegisterAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, tour_id):
        tour = get_object_or_404(Tour, id=tour_id)

        if tour.is_expired():
            return Response({"detail": "زمان ثبت‌نام این تور به پایان رسیده است."}, status=status.HTTP_400_BAD_REQUEST)

        if TourRegistration.objects.filter(user=request.user, tour=tour).exists():
            return Response({"detail": "شما قبلاً در این تور ثبت‌نام کرده‌اید."}, status=status.HTTP_400_BAD_REQUEST)

        # بررسی تداخل زمانی با سایر تورها
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

        # بررسی ظرفیت تور
        current_registrations = TourRegistration.objects.filter(tour=tour).count()
        if current_registrations >= tour.capacity:
            return Response(
                {"detail": "ظرفیت این تور پر شده و امکان ثبت‌نام وجود ندارد."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ثبت‌نام
        registration = TourRegistration.objects.create(user=request.user, tour=tour)
        serializer = TourRegistrationSerializer(registration)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
