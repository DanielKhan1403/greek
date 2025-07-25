from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import PostImage

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post, Event
# Регистрация приложения с новым именем
admin.site.site_header = _("Администрирование сайта")
admin.site.index_title = _("Добро пожаловать в админку")
admin.site.site_title = _("Админ-панель")

class PostImageInline(GenericTabularInline):
    model = PostImage
    extra = 3
    readonly_fields = ('image_preview',)
    fields = ['image', 'caption', 'image_preview']

    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            return format_html('<img src="{}" style="max-height: 100px; max-width: 100px;" />', obj.image_url)
        return "Нет изображения"
    image_preview.short_description = 'Предпросмотр'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_short_description', 'created_at')
    list_filter = ['created_at', 'updated_at']
    search_fields = ['title', 'description']
    readonly_fields = ('cover_preview', 'post_preview')
    inlines = [PostImageInline]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs  # Удален prefetch_related, так как images использует GenericForeignKey

    def cover_preview(self, obj):
        return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.cover_url)
    cover_preview.short_description = 'Предпросмотр обложки'

    @receiver(post_save, sender=Post)
    @receiver(post_delete, sender=Post)
    def invalidate_post_cache(sender, **kwargs):
        cache.delete_pattern('posts_*')

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        cache.delete_pattern('posts_*')  # или 'events_*' в EventAdmin

    def post_preview(self, obj):
        preview = f"""
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; max-width: 400px;">
            <h2 style="font-size: 1.5em; margin: 0 0 10px;">{obj.title}</h2>
            <p style="margin: 0 0 10px;">{obj.short_description}</p>
            <div style="margin-bottom: 10px;">
                <strong>Обложка:</strong><br>
                <img src="{obj.cover_url}" style="max-height: 150px; max-width: 150px;" />
            </div>
            <div>
                <strong>Дополнительные изображения:</strong><br>
                {''.join([f'<img src="{img.image_url}" style="max-height: 100px; max-width: 100px; margin-right: 10px;" alt="{img.caption}" />' for img in PostImage.objects.filter(content_type__model='post', object_id=obj.id)]) or 'Нет изображений'}
            </div>
        </div>
        """
        return format_html(preview)
    post_preview.short_description = 'Предварительный просмотр поста'

    def get_short_description(self, obj):
        """Короткое описание"""
        return obj.short_description
    get_short_description.short_description = 'Короткое описание'

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_short_description', 'event_date_time', 'created_at')
    list_filter = ['event_date_time', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ('cover_preview', 'post_preview')
    inlines = [PostImageInline]

    def get_queryset(self, request):
        # Возвращаем queryset без prefetch_related, так как images использует GenericForeignKey
        qs = super().get_queryset(request)
        return qs

    def cover_preview(self, obj):
        return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.cover_url)
    cover_preview.short_description = 'Предпросмотр обложки'

    @receiver(post_save, sender=Event)
    @receiver(post_delete, sender=Event)
    def invalidate_event_cache(sender, **kwargs):
        cache.delete_pattern('events_*')

    def delete_queryset(self, request, queryset):
        super().delete_queryset(request, queryset)
        cache.delete_pattern('events_*')  # или 'events_*' в EventAdmin

    def post_preview(self, obj):
        preview = f"""
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; max-width: 400px;">
            <h2 style="font-size: 1.5em; margin: 0 0 10px;">{obj.title}</h2>
            <p style="margin: 0 0 10px;">{obj.short_description}</p>
            <div style="margin-bottom: 10px;">
                <strong>Обложка:</strong><br>
                <img src="{obj.cover_url}" style="max-height: 150px; max-width: 150px;" />
            </div>
            <div>
                <strong>Дата события:</strong> {obj.event_date_time.strftime('%Y-%m-%d %H:%M')}<br>
                <strong>Дополнительные изображения:</strong><br>
                {''.join([f'<img src="{img.image_url}" style="max-height: 100px; max-width: 100px; margin-right: 10px;" alt="{img.caption}" />' for img in PostImage.objects.filter(content_type__model='event', object_id=obj.id)]) or 'Нет изображений'}
            </div>
        </div>
        """
        return format_html(preview)
    post_preview.short_description = 'Предварительный просмотр события'

    def get_short_description(self, obj):
        """Короткое описание"""
        return obj.short_description
    get_short_description.short_description = 'Короткое описание'

@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ['content_object', 'image', 'caption']
    list_filter = ['content_type']
    search_fields = ['caption']

    def content_object(self, obj):
        return obj.content_object
    content_object.short_description = 'Связанный объект'