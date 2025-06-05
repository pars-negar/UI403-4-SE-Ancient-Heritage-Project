from django.shortcuts import render
from .serializers import Attractionserializers , TourFilterSerializer, TourSerializer,TourCreateSerializer
from .models import Attraction
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Tour
from rest_framework.views import APIView
from rest_framework import generics, permissions

class TourCreateAPIView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourCreateSerializer
    permission_classes = [permissions.AllowAny]  # برای تست؛ بعدا بهتره IsAuthenticated باشه

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)  # context خودکار گرفته میشه
        serializer.is_valid(raise_exception=True)  # خطا رو پرتاب می‌کنه خودکار اگر ناصحیح بود
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)






class AttractionViewSet(viewsets.ModelViewSet):

    queryset = Attraction.objects.all()
    serializer_class = Attractionserializers


# View to handle filtered search of tours based on user input
from .utils import search_tours ,search_attractions

class TourSearchView(APIView):
    def post(self, request):
        serializer = TourFilterSerializer(data=request.data)

        if serializer.is_valid():
            filters = serializer.validated_data

            queryset = search_tours(
                origin=filters.get('origin'),
                destination=filters.get('destination'),
                start_date=filters.get('start_date'),
                end_date=filters.get('end_date'),
            )

            if not queryset.exists():
                return Response({"message": "No tours found matching your criteria."}, status=404)

            return Response(TourSerializer(queryset, many=True).data)

        return Response(serializer.errors, status=400)


class AttractionSearchAPIView(APIView):
    def post(self, request):
        name = request.data.get('name')
        city = request.data.get('city')
        historical_period = request.data.get('historical_period')

        queryset = search_attractions(name=name, city=city, historical_period=historical_period)

        if queryset.exists():
            serializer = Attractionserializers(queryset, many=True)
            return Response(serializer.data)

        return Response(
            {"message": "No attractions found matching your criteria."},
            status=status.HTTP_404_NOT_FOUND
        )