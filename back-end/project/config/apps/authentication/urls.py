from django.urls import path
from .views import ShowHomePage , login

urlpatterns = [
    path('send-otp/', ShowHomePage.as_view(), name='send_otp'),
    path('login/', login.as_view(), name='login'),
]
