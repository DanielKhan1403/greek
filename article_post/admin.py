from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Post, PostImage, Events

# Регистрация приложения с новым именем
admin.site.site_header = _("Администрирование сайта")
admin.site.index_title = _("Добро пожаловать в админку")
admin.site.site_title = _("Админ-панель")

class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 3
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            return format_html('<img src="{}" style="max-height: 100px; max-width: 100px;" />', obj.image_url)
        return "Нет изображения"
    image_preview.short_description = 'Предпросмотр'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_short_description', 'created_at')  # Используем кастомный метод
    readonly_fields = ('cover_preview', 'post_preview')
    inlines = [PostImageInline]

    def cover_preview(self, obj):
        return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.cover_url)
    cover_preview.short_description = 'Предпросмотр обложки'

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
                {''.join([f'<img src="{img.image_url}" style="max-height: 100px; max-width: 100px; margin-right: 10px;" alt="{img.caption}" />' for img in obj.images.all()]) or 'Нет изображений'}
            </div>
        </div>
        """
        return format_html(preview)
    post_preview.short_description = 'Предварительный просмотр поста'

    def get_short_description(self, obj):
        """Короткое описание"""
        return obj.short_description
    get_short_description.short_description = 'Короткое описание'  # Задаём читаемое имя

@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = ('title', 'short_description', 'event_date_time', 'created_at')
    readonly_fields = ('cover_preview', 'post_preview')
    inlines = [PostImageInline]

    def cover_preview(self, obj):
        return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.cover_url)
    cover_preview.short_description = 'Предпросмотр обложки'

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
                {''.join([f'<img src="{img.image_url}" style="max-height: 100px; max-width: 100px; margin-right: 10px;" alt="{img.caption}" />' for img in obj.images.all()]) or 'Нет изображений'}
            </div>
        </div>
        """
        return format_html(preview)
    post_preview.short_description = 'Предварительный просмотр поста'

    def get_short_description(self, obj):
        """Короткое описание"""
        return obj.short_description
    get_short_description.short_description = 'Короткое описание'