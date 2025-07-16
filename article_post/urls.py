from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, EventViewSet, PostImageViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'events', EventViewSet)
router.register(r'images', PostImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]