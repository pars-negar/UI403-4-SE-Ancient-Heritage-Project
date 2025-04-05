from django.shortcuts import render
from .serializers import Attractionserializers
from .models import Attraction
from rest_framework import viewsets

class AttractionViewSet(viewsets.ModelViewSet):

    queryset = Attraction.objects.all()
    serializer_class = Attractionserializers

