from django.core.cache import cache
from rest_framework.response import Response
from django.conf import settings
import logging
logger = logging.getLogger(__name__)
class CacheInvalidationMixin:
    cache_prefix = None  # Должен быть определен в ViewSet (например, 'posts', 'events')

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
        if self.cache_prefix:
            cache.delete_pattern(f"{self.cache_prefix}_*")
        else:
            # Лучше выбросить ошибку, чтобы не чистить весь кэш
            logger.warning("cache_prefix не задан, кэш не был сброшен.")


class CachedListRetrieveMixin:
    cache_prefix = None  # обязательно указать в ViewSet

    def list(self, request, *args, **kwargs):
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