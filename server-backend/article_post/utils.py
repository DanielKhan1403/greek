import logging
from functools import wraps
from django.core.cache import cache
from django.conf import settings
from rest_framework.response import Response

logger = logging.getLogger(__name__)

def cache_view(cache_prefix, key_type='list'):
    """
    Декоратор для кэширования ответов DRF ViewSet.
    :param cache_prefix: Префикс кэша (например, 'posts', 'events')
    :param key_type: Тип ключа ('list' для списка, 'retrieve' для объекта)
    """
    def decorator(view_method):
        @wraps(view_method)
        def wrapped_view(self, request, *args, **kwargs):
            # Формируем ключ кэша
            if key_type == 'retrieve':
                cache_key = f"{cache_prefix}_{kwargs.get('pk')}"
                log_id = kwargs.get('pk')
            else:
                cache_key = f"{cache_prefix}_list"
                log_id = 'списка'

            # Проверяем кэш
            result = cache.get(cache_key)
            if result is None:
                logger.info(f"Кэш пуст для {cache_prefix} {log_id}, выполняем запрос к БД")
                response = view_method(self, request, *args, **kwargs)
                cache.set(cache_key, response.data, settings.CACHE_TTL)
                return Response(response.data)
            logger.info(f"Данные {cache_prefix} {log_id} взяты из кэша")
            return Response(result)
        return wrapped_view
    return decorator