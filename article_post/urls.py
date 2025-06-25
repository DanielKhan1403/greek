from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, EventsViewSet, PostImageViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'events', EventsViewSet)
router.register(r'post-images', PostImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]