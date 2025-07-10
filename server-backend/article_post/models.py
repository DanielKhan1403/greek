






import os
import uuid
from io import BytesIO
from PIL import Image
from django.db import models
from django.core.files.base import ContentFile
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


def convert_image_to_webp(original_image_field, quality=85):
    """Конвертирует изображение в WEBP и возвращает ContentFile"""
    img = Image.open(original_image_field)
    img = img.convert("RGB")  # обязательно для WEBP
    img_io = BytesIO()
    img.save(img_io, format='WEBP', quality=quality)
    img_io.seek(0)
    return ContentFile(img_io.read())


class PostImage(models.Model):
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={'model__in': ('post', 'event')}
    )
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')

    image = models.ImageField(
        upload_to='post_images/',
        verbose_name='Изображение в тексте',
        default='default.webp'
    )
    caption = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Подпись к изображению'
    )

    @property
    def image_url(self):
        return self.image.url if self.image and hasattr(self.image, 'url') else '/static/images/default_image.jpg'

    def save(self, *args, **kwargs):
        original_image = self.image

        super().save(*args, **kwargs)  # Сначала сохранить, чтобы был путь

        if original_image and not self.image.name.lower().endswith('.webp'):
            filename_wo_ext = os.path.splitext(self.image.name)[0]
            webp_filename = f"{filename_wo_ext}.webp"

            # Конвертация
            webp_image = convert_image_to_webp(original_image)

            # Удаляем старый файл (если он существует и не webp)
            if os.path.exists(self.image.path):
                os.remove(self.image.path)

            # Сохраняем webp-файл
            self.image.save(webp_filename, webp_image, save=False)

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('Изображение поста')
        verbose_name_plural = _('Изображения постов')


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, verbose_name='Заголовок')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    description = models.TextField(verbose_name='Полный текст')
    cover = models.ImageField(
        upload_to='post_covers/',
        null=True,
        blank=True,
        verbose_name='Обложка поста',
        default='defaults/default_cover.jpg'
    )

    @property
    def short_description(self):
        return f"{self.description[:50]}..." if len(self.description) > 50 else self.description

    @property
    def cover_url(self):
        return self.cover.url if self.cover and hasattr(self.cover, 'url') else '/static/images/default_cover.jpg'

    def __str__(self):
        return f"{self.title} – {self.short_description}"

    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, verbose_name='Заголовок')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    description = models.TextField(verbose_name='Полный текст')
    cover = models.ImageField(
        upload_to='event_covers/',
        null=True,
        blank=True,
        verbose_name='Обложка события',
        default='defaults/default_cover.jpg'
    )
    event_date_time = models.DateTimeField(
        verbose_name='Дата и время события',
        help_text='Укажите дату и время, когда событие будет происходить'
    )

    @property
    def short_description(self):
        return f"{self.description[:50]}..." if len(self.description) > 50 else self.description

    @property
    def cover_url(self):
        return self.cover.url if self.cover and hasattr(self.cover, 'url') else '/static/images/default_cover.jpg'

    def __str__(self):
        return f"{self.title} – {self.event_date_time.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

