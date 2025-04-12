# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from .serializers import AttractionSerializer, TourSerializer, FAQSerializer
# from apps.tour.models import Attraction,Tour
# from apps.faq.models import FAQ

# class FrontPageAPIView(APIView):
#     def get(self, request):
#         attractions = Attraction.objects.all()[:3]
#         tours = Tour.objects.order_by('-start_date')[:3]
#         faqs = FAQ.objects.all()[:3]

#         data = {
#             'attractions': AttractionSerializer(attractions, many=True).data,
#             'tours': TourSerializer(tours, many=True).data,
#             'faqs': FAQSerializer(faqs, many=True).data,
#         }
#         return Response(data, status=status.HTTP_200_OK)

# # Create your views here.
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from .serializers import AttractionSerializer, TourSerializer, FAQSerializer
# from tour.models import Attraction
# from tours.models import Tour
# from faq.models import FAQ

# class FrontPageAPIView(APIView):
#     def get(self, request):
#         # فیلتر: مثلا ۳ جاذبه برتر، ۳ تور جدید، ۳ سوال متداول
#         attractions = Attraction.objects.all()[:3]
#         tours = Tour.objects.order_by('-start_date')[:3]
#         faqs = FAQ.objects.all()[:3]

#         data = {
#             'attractions': AttractionSerializer(attractions, many=True).data,
#             'tours': TourSerializer(tours, many=True).data,
#             'faqs': FAQSerializer(faqs, many=True).data,
#         }
#         return Response(data, status=status.HTTP_200_OK)
