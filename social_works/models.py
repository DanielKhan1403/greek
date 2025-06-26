from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField


# модель формы для того чтоб стать участником сообщества

class BeMemberForm(models.Model):
    full_name = models.CharField(max_length=50)
    age = models.PositiveIntegerField(
        validators=[MinValueValidator(12), MaxValueValidator(26)],
        verbose_name='Возраст'
    )
    email_address = models.EmailField(verbose_name='Электронная почта')
    phone_number = PhoneNumberField(
        region="UZ",
        unique=True,
        verbose_name='Номер телефона (Узбекистан)'
    )
    message = models.TextField(verbose_name='Напишите о себе')

    def __str__(self):
        return f"{self.full_name} — {self.phone_number}"

    class Meta:
        verbose_name = 'Заявка на участие'
        verbose_name_plural = 'Заявки на участие'
