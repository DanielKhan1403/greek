from rest_framework import serializers
from .models import Post, Events, PostImage, Comment


class PostImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()

    class Meta:
        model = PostImage
        fields = ['id', 'image', 'image_url', 'caption']

class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    short_description = serializers.ReadOnlyField()
    cover_url = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'created_at', 'updated_at', 'description', 'short_description', 'cover', 'cover_url', 'images']

class EventsSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    short_description = serializers.ReadOnlyField()
    cover_url = serializers.ReadOnlyField()

    class Meta:
        model = Events
        fields = ['id', 'title', 'created_at', 'updated_at', 'description', 'short_description', 'cover', 'cover_url', 'event_date_time', 'images']



