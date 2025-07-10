from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter, UUIDFilter
from django.contrib.contenttypes.models import ContentType
from .models import Post, Event, PostImage
from .serializers import PostSerializer, EventSerializer, PostImageSerializer
from .mixin import CacheInvalidationMixin, CachedListRetrieveMixin, PublicReadOnlyMixin


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostImageFilter(FilterSet):
    content_type = CharFilter(field_name='content_type__model', lookup_expr='exact')
    object_id = UUIDFilter(field_name='object_id', lookup_expr='exact')

    class Meta:
        model = PostImage
        fields = ['content_type', 'object_id', 'caption']


class PostViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    cache_prefix = 'posts'
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['created_at', 'updated_at']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']


class EventViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    cache_prefix = 'events'
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['created_at', 'updated_at', 'event_date_time']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'event_date_time', 'title']
    ordering = ['-event_date_time']


class PostImageViewSet(CachedListRetrieveMixin, CacheInvalidationMixin, PublicReadOnlyMixin, viewsets.ModelViewSet):
    queryset = PostImage.objects.select_related('content_type')
    serializer_class = PostImageSerializer
    cache_prefix = 'post_images'
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = PostImageFilter
    search_fields = ['caption']
    ordering_fields = ['id']
    ordering = ['id']