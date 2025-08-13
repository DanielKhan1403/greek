from django.core.cache import cache
from rest_framework.response import Response
from django.conf import settings
import logging
logger = logging.getLogger(__name__)
from django.core.cache import cache
from rest_framework.response import Response
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class CacheInvalidationMixin:
    cache_prefix = None  # например, 'posts' или 'events'

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        self.invalidate_cache()
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        self.invalidate_cache()
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        self.invalidate_cache()
        return response

    def invalidate_cache(self):
        if not self.cache_prefix:
            logger.warning("cache_prefix не задан, кэш не был сброшен.")
            return

        try:
            # Удаляем все ключи по шаблону, учитывая возможный KEY_PREFIX
            pattern = f"*{self.cache_prefix}_*"
            cache.delete_pattern(pattern)
            logger.info(f"Кэш с префиксом '{self.cache_prefix}' очищен")
        except AttributeError:
            # Если delete_pattern недоступен — просто удаляем ключи вручную
            cache.delete(f"{self.cache_prefix}_list")
            logger.info(f"Ключ {self.cache_prefix}_list удалён")



class CachedListRetrieveMixin:
    cache_prefix = None  # обязательно указать в ViewSet

    def list(self, request, *args, **kwargs):
        if not self.cache_prefix:
            return super().list(request, *args, **kwargs)

        cache_key = f"{self.cache_prefix}_list"
        result = cache.get(cache_key)
        if result is None:
            logger.info(f"Кэш пуст для {cache_key}, выполняем запрос к БД")
            response = super().list(request, *args, **kwargs)
            cache.set(cache_key, response.data, settings.CACHE_TTL)
            return Response(response.data)
        logger.info(f"Данные {cache_key} взяты из кэша")
        return Response(result)

    def retrieve(self, request, *args, **kwargs):
        if not self.cache_prefix:
            return super().retrieve(request, *args, **kwargs)

        pk = self.kwargs['pk']
        cache_key = f"{self.cache_prefix}_{pk}"
        result = cache.get(cache_key)
        if result is None:
            logger.info(f"Кэш пуст для {cache_key}, выполняем запрос к БД")
            response = super().retrieve(request, *args, **kwargs)
            cache.set(cache_key, response.data, settings.CACHE_TTL)
            return Response(response.data)
        logger.info(f"Данные {cache_key} взяты из кэша")
        return Response(result)



class PublicReadOnlyMixin:
    from rest_framework.permissions import AllowAny, IsAdminUser

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [self.AllowAny()]
        return [self.IsAdminUser()]