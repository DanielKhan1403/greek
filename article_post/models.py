import uuid
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
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
        default='defaults/default_cover.jpg'  # Дефолтная заглушка
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


class Events(Post):
    event_date_time = models.DateTimeField(
        verbose_name='Дата и время события',
        help_text='Укажите дату и время, когда событие будет происходить'
    )

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    def __str__(self):
        return f"{self.title} – {self.event_date_time.strftime('%Y-%m-%d %H:%M')}"



class PostImage(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Пост'
    )
    image = models.ImageField(
        upload_to='post_images/',
        verbose_name='Изображение в тексте',
        default='wost_covers/wallpaperbetter.jpg'  # Дефолтная заглушка
    )
    caption = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Подпись к изображению'
    )

    @property
    def image_url(self):
        return self.image.url if self.image and hasattr(self.image, 'url') else '/static/images/default_image.jpg'

    def __str__(self):
        return f"Изображение для {self.post.title}"








class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', verbose_name='Пост')
    content = models.TextField(verbose_name='Комментарий')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='Создан')
    ip_address = models.GenericIPAddressField(verbose_name='IP-адрес', blank=True, null=True)
    user_agent = models.TextField(verbose_name='User-Agent', blank=True, null=True)
    fingerprint = models.CharField(max_length=255, blank=True, null=True, verbose_name='Браузерный отпечаток')

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return f"Комментарий к '{self.post.title}' от {self.ip_address}"

    def clean(self):
        from django.contrib.auth.models import AnonymousUser
        request = getattr(self, '_request', None)

        # Только если сохранение не через админку
        if request and not (hasattr(request, 'user') and (request.user.is_staff or request.user.is_superuser)):
            if not self.ip_address or not self.user_agent:
                raise ValidationError("IP-адрес и User-Agent обязательны для пользователей.")
