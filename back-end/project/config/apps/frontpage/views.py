from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from .serializers import  AttractionSerializer,TourReservationSerializer
from apps.tour.serializers import (TourSerializer, TourListSerializer, TourDetailSerializer,
                                    TourUpdateSerializer, TourCreateSerializer)
from apps.tour.models import Attraction, Tour
from apps.faq.models import FAQ
from rest_framework import generics
from apps.users.permissions import *
from rest_framework.permissions import *
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from rest_framework import generics, permissions
from apps.reserve.models import Passenger
from apps.reserve.serializers import TourPassengerSerializer
from apps.core.mixins import UserInfoAppendMixin


from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.tour.utils import search_tours

from apps.tour.models import Attraction
from apps.reserve.models import Reservation, Passenger
from apps.reserve.serializers import PassengerSerializer
from apps.tour.models import Tour
from django.db import transaction
from apps.core.mixins import UserInfoAppendMixin

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db import transaction
from apps.reserve.models import  RoomType, Reservation, Passenger, ReservedRoom

from apps.users.serializers import UserProfileCombinedSerializer



class TourDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
class DashboardRedirectAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'tour_manager':
            url = '/api/users/tourleaderdashboard'
        elif user.role == 'user':
            url = '/api/homepage/profile'
        else:
            url = '/api/homepage/profile'  

        return Response({'dashboard_url': url})


class UserProfileView(UserInfoAppendMixin, generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileCombinedSerializer
    permission_classes = [IsNormalUser]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return self.append_user_info(response, request)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return self.append_user_info(response, request)




class CreateTourAPIView(UserInfoAppendMixin , generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(tour_manager=self.request.user)

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        return self.append_user_info(response, request)

class RegisteredPassengersListAPIView(UserInfoAppendMixin, APIView):
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
        response = Response(serializer.data, status=status.HTTP_200_OK)
        return self.append_user_info(response, request)
    
class TourSoftDeleteAPIView(UserInfoAppendMixin, APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):  
        tour_id = request.data.get('tour_id')
        try:
            tour = Tour.objects.get(id=tour_id)
        except Tour.DoesNotExist:
            response = Response({"detail": "تور یافت نشد."}, status=status.HTTP_404_NOT_FOUND)
            return self.append_user_info(response, request)

        if tour.tour_manager != request.user:
            response = Response({"detail": "شما اجازه حذف این تور را ندارید."}, status=status.HTTP_403_FORBIDDEN)
            return self.append_user_info(response, request)

        tour.delete()
        response = Response({"detail": "تور با موفقیت حذف شد."}, status=status.HTTP_200_OK)
        return self.append_user_info(response, request)



# class IsTourManagerAndOwner(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return request.user.role == 'tour_manager' and obj.tour_manager == request.user

class TourUpdateAPIView(UserInfoAppendMixin, generics.RetrieveUpdateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tour.objects.filter(tour_manager=self.request.user)

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        return self.append_user_info(response, request)

    def patch(self, request, *args, **kwargs):
        response = super().patch(request, *args, **kwargs)
        return self.append_user_info(response, request)

class TourListAPIView(UserInfoAppendMixin, APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'tour_manager':
            response = Response({'detail': 'دسترسی غیرمجاز'}, status=status.HTTP_403_FORBIDDEN)
            return self.append_user_info(response, request)

        today = now().date()
        upcoming_tours = Tour.objects.filter(tour_manager=user, start_date__gte=today).order_by('start_date')
        past_tours = Tour.objects.filter(tour_manager=user, start_date__lt=today).order_by('-start_date')

        upcoming_serializer = TourListSerializer(upcoming_tours, many=True, context={'request': request})
        past_serializer = TourListSerializer(past_tours, many=True, context={'request': request})

        response = Response({
            'upcoming_tours': upcoming_serializer.data,
            'past_tours': past_serializer.data,
        })
        return self.append_user_info(response, request)


class TourDetailAPIView(UserInfoAppendMixin, APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        try:
            tour = Tour.objects.get(pk=pk, tour_manager=user)
        except Tour.DoesNotExist:
            response = Response({'detail': 'تور پیدا نشد یا دسترسی ندارید'}, status=status.HTTP_404_NOT_FOUND)
            return self.append_user_info(response, request)

        serializer = TourDetailSerializer(tour, context={'request': request})
        response = Response(serializer.data)
        return self.append_user_info(response, request)


class HomePageAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def format_attractions(self, request, queryset):
        formatted = []
        for attr in queryset:
            full_name = attr.attraction_name
            parts = full_name.split('؛', 1)
            title = parts[0].strip()
            subtitle = parts[1].strip() if len(parts) > 1 else ''

            thumbnail = attr.images.filter(image_type='thumbnail').first()
            image_url = request.build_absolute_uri(thumbnail.image.url) if thumbnail else None

            formatted.append({
                'id': attr.id,
                'title': title,
                'subtitle': subtitle,
                'image': image_url,
            })
        return formatted

    def format_tours(self, request, queryset):
        formatted = []
        for tour in queryset:
            thumbnail = tour.images.filter(image_type='thumbnail').first()
            image_url = request.build_absolute_uri(thumbnail.image.url) if thumbnail else None

            formatted.append({
                'id': tour.id,
                'tour_name': tour.tour_name,
                'destination': tour.destination,
                'origin': tour.origin,
                'price': int(tour.price),
                'start_date': tour.start_date.isoformat() if tour.start_date else None,
                'end_date': tour.end_date.isoformat() if tour.end_date else None,
                'image': image_url,
                'category': tour.category,
                'rating': tour.rating,
            })
        return formatted

    def get(self, request):
        # ====== Attractions ======
        attractions_qs = Attraction.objects.all()[:6]
        attractions = self.format_attractions(request, attractions_qs)

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

            tours = self.format_tours(request, tours_qs)
            data = {
                'attractions': attractions,
                'search_results': tours
            }
        else:
            # ====== Latest Tours (6) ======
            latest_tours = Tour.objects.order_by('-start_date')[:6]
            # ====== Top Tours (6) ======
            top_tours = Tour.objects.order_by('-rating')[:6]

            data = {
                'attractions': attractions,
                'latest': self.format_tours(request, latest_tours),
                'top': self.format_tours(request, top_tours)
            }

        return Response(data, status=status.HTTP_200_OK)




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
  "historical_period": "دوره صفویه",
  "city": "اصفهان، محله جلفا",
  "location": "مرکز محله جلفای اصفهان",
  "opening_hours": "همه روزه 9 صبح تا 5 عصر",
  "entry_fee": "30,000 تومان (برای ایرانیان)",
  "details": "معرفی\nکلیسای وانک یکی از مهم‌ترین و مشهورترین کلیساهای ارامنه در ایران است که در دوره صفویه و در زمان شاه عباس دوم ساخته شد. این کلیسا در محله تاریخی جلفای اصفهان قرار دارد و تلفیقی از معماری ایرانی و اروپایی را به نمایش می‌گذارد.\n\nویژگی‌ها\nکلیسای وانک دارای گنبدی زیبا، دیوارهایی با نقاشی‌های مذهبی و طلایی‌کاری چشم‌نواز است. همچنین موزه‌ای در این مجموعه قرار دارد که آثار تاریخی، نسخ خطی، لباس‌های مذهبی و ابزار چاپ قدیمی را به نمایش می‌گذارد.\n\nقدمت\nساخت این کلیسا در سال ۱۶۵۵ میلادی آغاز و در سال ۱۶۶۴ میلادی به پایان رسید. این مکان نمادی از حضور و فرهنگ جامعه ارامنه در ایران به‌شمار می‌رود."

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




class AttractionDetailAPIView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        detail= instance.images.filter(image_type='card2').first()
        image_url = request.build_absolute_uri(detail.image.url) if detail else None

        data = serializer.data
        data['image'] = image_url
        return Response(data)



class TourReservationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = TourReservationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        user = request.user

        # دریافت تور
        try:
            tour = Tour.objects.get(id=data["tour_id"])
        except Tour.DoesNotExist:
            return Response({"detail": "تور یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        passengers_data = data["passengers"]
        reserved_rooms_data = data["reserved_rooms"]

        passenger_count = len(passengers_data)

        # دریافت همه room_type های مربوط به این تور
        room_type_ids = [room['room_type_id'] for room in reserved_rooms_data]
        room_types = RoomType.objects.filter(id__in=room_type_ids, tour=tour)
        room_type_map = {rt.id: rt for rt in room_types}

        total_capacity = 0
        total_price = 0

        for room in reserved_rooms_data:
            room_type = room_type_map.get(room['room_type_id'])
            if not room_type:
                return Response({"detail": f"اتاق با شناسه {room['room_type_id']} برای این تور وجود ندارد."},
                                status=status.HTTP_400_BAD_REQUEST)

            count = room['count']
            if room_type.remaining < count:
                return Response({"detail": f"اتاق {room_type.name} به تعداد کافی موجود نیست."},
                                status=status.HTTP_400_BAD_REQUEST)

            total_capacity += room_type.capacity * count
            total_price += room_type.price_per_room * count

        # اعتبارسنجی ظرفیت اتاق‌ها
        if total_capacity < passenger_count:
            return Response({"detail": "ظرفیت کل اتاق‌ها کمتر از تعداد مسافران است."}, status=status.HTTP_400_BAD_REQUEST)

        if total_capacity > passenger_count + 2:
            return Response({"detail": "ظرفیت کل اتاق‌ها نمی‌تواند بیشتر از تعداد مسافران + ۲ باشد."},
                            status=status.HTTP_400_BAD_REQUEST)

        # محاسبه قیمت نهایی (مثلاً قیمت پایه هر نفر)
        total_price += passenger_count * tour.base_price

        # ایجاد رزرو
        reservation = Reservation.objects.create(user=user, tour=tour, full_price=total_price)

        # ایجاد مسافران
        for p_data in passengers_data:
            p_serializer = PassengerSerializer(data=p_data)
            if p_serializer.is_valid():
                p_serializer.save(reservation=reservation)
            else:
                transaction.set_rollback(True)
                return Response(p_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # ذخیره اتاق‌ها و به‌روزرسانی ظرفیت باقی‌مانده
        for room in reserved_rooms_data:
            room_type = room_type_map[room['room_type_id']]
            count = room['count']

            room_type.remaining -= count
            room_type.save()

            ReservedRoom.objects.create(reservation=reservation, room_type=room_type, count=count)

        return Response({
            "detail": "رزرو با موفقیت انجام شد.",
            "reservation_id": reservation.id,
            "total_price": total_price,
            "passenger_count": passenger_count,
            "reserved_rooms": reserved_rooms_data,
        }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_cities_with_places(request):
    cities = Attraction.objects.values_list('city', flat=True).distinct()
    return Response({'cities': list(cities)}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_origins_and_destinations(request):
    origins = Tour.objects.values_list('origin', flat=True).distinct()
    destinations = Tour.objects.values_list('destination', flat=True).distinct()
    
    return Response({
        "origins": list(origins),
        "destinations": list(destinations),
    })
import jdatetime

class SearchTourAPIView(APIView):
    def post(self, request):
        origin = request.data.get('origin')
        destination = request.data.get('destination')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        tours = Tour.objects.all()

        if origin:
            tours = tours.filter(origin__name__icontains=origin)
        if destination:
            tours = tours.filter(destination__name__icontains=destination)
        if start_date:
            tours = tours.filter(start_date__gte=jdatetime.date.fromisoformat(start_date))
        if end_date:
            tours = tours.filter(end_date__lte=jdatetime.date.fromisoformat(end_date))

        serializer = TourSerializer(tours, many=True)
        return Response(serializer.data)
