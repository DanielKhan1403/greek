from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Post, Event, PostImage

class PostImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    content_type = serializers.SlugRelatedField(
        slug_field='model',
        queryset=ContentType.objects.filter(model__in=['post', 'event']),
        read_only=False
    )
    content_object = serializers.SerializerMethodField()

    class Meta:
        model = PostImage
        fields = ['id', 'image', 'image_url', 'caption', 'content_type', 'object_id', 'content_object']

    def get_content_object(self, obj):
        # 🔒 Защита от бесконечной вложенности
        if self.context.get('disable_nested', False):
            return None

        if obj.content_object:
            if obj.content_type.model == 'post':
                return PostSerializer(obj.content_object, context=self.context).data
            elif obj.content_type.model == 'event':
                return EventSerializer(obj.content_object, context=self.context).data
        return None


class PostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    short_description = serializers.ReadOnlyField()
    cover_url = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'created_at',
            'updated_at',
            'description',
            'short_description',
            'cover',
            'cover_url',
            'images'
        ]

    def get_images(self, obj):
        content_type = ContentType.objects.get_for_model(Post)
        images = PostImage.objects.filter(content_type=content_type, object_id=obj.id)
        context = {**self.context, 'disable_nested': True}
        return PostImageSerializer(images, many=True, context=context).data


class EventSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    short_description = serializers.ReadOnlyField()
    cover_url = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'created_at',
            'updated_at',
            'description',
            'short_description',
            'cover',
            'cover_url',
            'event_date_time',
            'images'
        ]

    def get_images(self, obj):
        content_type = ContentType.objects.get_for_model(Event)
        images = PostImage.objects.filter(content_type=content_type, object_id=obj.id)
        context = {**self.context, 'disable_nested': True}
        return PostImageSerializer(images, many=True, context=context).data
