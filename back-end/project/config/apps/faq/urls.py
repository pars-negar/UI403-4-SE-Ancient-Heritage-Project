from rest_framework.routers import DefaultRouter
from .views import FAQViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'faq', FAQViewSet, basename='faq')

urlpatterns = [
<<<<<<< HEAD
    path('', include(router.urls)),
=======
    path('faq/', include(router.urls)),
>>>>>>> bddb0ca2bc98ddbc93efc559cf8932a0c902bad4
]
