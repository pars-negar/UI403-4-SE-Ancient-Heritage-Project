from django.urls import path
from .views import FrontPageAPIView

urlpatterns = [
    path('', FrontPageAPIView.as_view(), name='frontpage'),
]
