from rest_framework.routers import SimpleRouter
from .views import CustomUserViewSet

app_name = 'apps.users'  

router = SimpleRouter()
router.register('customuser', CustomUserViewSet)

urlpatterns = router.urls
