from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BeMemberForm

print("SIGNAL LOADED")
@receiver(post_save, sender=BeMemberForm)
def send_submission_email(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject="Спасибо за подачу заявки!",
            message=(
                f"Здравствуйте, {instance.full_name}!\n\n"
                "Ваша заявка успешно получена. Мы рассмотрим её в ближайшее время."
            ),
            from_email="noreply@example.com",
            recipient_list=[instance.email],
            fail_silently=True,
        )
