from django import forms
from django.contrib.auth import get_user_model
from .models import CustomUser

User = get_user_model()

# login form
class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)


