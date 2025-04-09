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
                return Response({"message": "توری با مشخصات درخواستی شما وجود ندارد"}, status=status.HTTP_404_NOT_FOUND)

            tour_serializer = TourSerializer(queryset, many=True)
            return Response(tour_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AttractionSearchAPIView(APIView):
    def post(self, request):
        name = request.data.get('name', None)
        city = request.data.get('city', None)
        historical_period = request.data.get('historical_period', None)

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
            return Response({"message": "مکانی با مشخصات درخواستی شما وجود ندارد."}, status=status.HTTP_404_NOT_FOUND)
