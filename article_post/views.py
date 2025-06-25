from rest_framework import viewsets
from .mixin import CacheInvalidationMixin, CachedListRetrieveMixin, PublicReadOnlyMixin
from .models import Post, Events, PostImage
from .serializers import PostSerializer, EventsSerializer, PostImageSerializer

class PostViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = Post.objects.prefetch_related('images')
    serializer_class = PostSerializer
    cache_prefix = 'posts'


class EventsViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = Events.objects.prefetch_related('images')
    serializer_class = EventsSerializer
    cache_prefix = 'events'


class PostImageViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = PostImage.objects.select_related('post')
    serializer_class = PostImageSerializer
    cache_prefix = 'post_images'
