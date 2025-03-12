from rest_framework.routers import SimpleRouter
from .views import CustomUserViewSet

app_name = 'apps.users'  

router = SimpleRouter()
router.register('admin/users/customuser', CustomUserViewSet)

urlpatterns = router.urls
