from django.apps import AppConfig

class SocialWorksConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'social_works'
    verbose_name = 'Социальные инструменты'  # маленькая опечатка в "инстументы"

    def ready(self):
        import social_works.signals  # регистрация сигналов при запуске
