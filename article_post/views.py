from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .mixin import CacheInvalidationMixin, CachedListRetrieveMixin, PublicReadOnlyMixin
from .models import Post, Events, PostImage,Comment
from .serializers import PostSerializer, EventsSerializer, PostImageSerializer, CommentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
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






# views.py



class AddCommentAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            ip = request.META.get('REMOTE_ADDR')
            if Comment.objects.filter(post=post, ip_address=ip).exists():
                return Response({'error': 'Вы уже оставляли комментарий к этому посту'}, status=403)
            serializer.save(
                post=post,
                ip_address=ip,
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            return Response({'success': 'Комментарий добавлен!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

