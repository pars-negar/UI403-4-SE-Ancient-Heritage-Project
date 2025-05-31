from django.shortcuts import render
from .serializers import Attractionserializers , TourFilterSerializer, TourSerializer
from .models import Attraction
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Tour
from rest_framework.views import APIView


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
