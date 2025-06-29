from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date
from django.core.mail import send_mail
from django.core.exceptions import ValidationError



class BeMemberForm(models.Model):
    STATUS_CHOICES = [
        ('pending', 'В процессе'),
        ('accepted', 'Принят'),
        ('rejected', 'Отклонён'),
    ]

    full_name = models.CharField(max_length=100, verbose_name='Фамилия Имя Отчество')
    birth_date = models.DateField(verbose_name='Дата рождения (число, месяц, год)')
    phone_number = PhoneNumberField(region="UZ", verbose_name='Номер телефона')
    telegram_account = models.CharField(max_length=100, blank=True, null=True, verbose_name='Telegram аккаунт')
    email = models.EmailField(verbose_name='E-Mail', default=None)
    address = models.TextField(verbose_name='Домашний адрес')

    greek_ancestor_relation = models.CharField(
        max_length=100,
        verbose_name='Кто из ваших предков является греком?',
        default = None,
        help_text = 'Если таких нет - напишите Нет'
    )
    greek_ancestor_surname = models.CharField(
        max_length=100,
        verbose_name='Фамилия вашего греческого предка',
        help_text='Если таких нет - напишите Нет'

    )
    about_yourself = models.TextField(verbose_name='Дополнительные сведения о себе', blank=True, null=True)
    interested_activities = models.TextField(
        verbose_name='Интересующая общественная деятельность',
        help_text='Например, кулинарные мастер-классы, изучение греческого языка и т.п.',

    )
    your_contribution = models.TextField(
        verbose_name='Ваш вклад в развитие и функционирование центра',
        help_text='Например, проведение мастер-классов, тренингов и т.п.',

    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Статус заявки'
    )

    def __str__(self):
        return f"{self.full_name} — {self.phone_number}"

    @property
    def age(self) -> int:
        today = date.today()
        if self.birth_date:
            return today.year - self.birth_date.year - (
                    (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
            )
        return 0

    @property
    def age_verbose(self) -> str:
        age = self.age
        if age % 10 == 1 and age % 100 != 11:
            suffix = "год"
        elif 2 <= age % 10 <= 4 and not (12 <= age % 100 <= 14):
            suffix = "года"
        else:
            suffix = "лет"
        return f"{age} {suffix}"

    def save(self, *args, **kwargs):
        if self.pk:
            old = BeMemberForm.objects.get(pk=self.pk)
            if old.status != self.status:
                send_mail(
                    subject="Обновление статуса заявки",
                    message=(
                        f"Здравствуйте, {self.full_name}!\n\n"
                        f"Статус вашей заявки обновлён: {self.get_status_display()}"
                    ),
                    from_email="noreply@example.com",
                    recipient_list=[self.email],
                    fail_silently=True,
                )
        super().save(*args, **kwargs)

    def clean(self):
        if self.birth_date:
            today = date.today()
            age = today.year - self.birth_date.year - (
                    (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
            )
            if not (12 <= age <= 26):
                raise ValidationError({
                    'birth_date': "Возраст должен быть от 12 до 26 лет."
                })

    class Meta:
        verbose_name = 'Заявка в Греческий Культурный Центр'
        verbose_name_plural = 'Заявки в Греческий Культурный Центр'
