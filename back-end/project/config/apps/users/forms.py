from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class  CustomUserCreationForm(UserCreationForm):
    class Meta (UserCreationForm):
        model = CustomUser
        fields= UserCreationForm.Meta.fields
        
class CustomUserChangeForm(UserChangeForm):
    class Mete:
        model = CustomUser
        fields = UserChangeForm.Meta.fields