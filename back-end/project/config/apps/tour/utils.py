# در attractions/utils.py
from .models import Attraction  
def search_attractions(name=None, city=None, historical_period=None):
    queryset = Attraction.objects.all()
    
    if name:
        queryset = queryset.filter(attraction_name__icontains=name)

    if city:
        queryset = queryset.filter(city__icontains=city)

    if historical_period:
        queryset = queryset.filter(historical_period=historical_period)

    return queryset



# tours/utils.py

from .models import Tour

def search_tours(origin=None, destination=None, start_date=None, end_date=None):
    queryset = Tour.objects.all()

    if origin:
        queryset = queryset.filter(origin=origin)

    if destination:
        queryset = queryset.filter(destination=destination)

    if start_date:
        queryset = queryset.filter(start_date__gte=start_date)

    if end_date:
        queryset = queryset.filter(end_date__lte=end_date)

    return queryset
