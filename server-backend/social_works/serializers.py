from rest_framework import serializers
from .models import BeMemberForm
from datetime import date
def calculate_age(birth_date):
    today = date.today()
    return today.year - birth_date.year - (
        (today.month, today.day) < (birth_date.month, birth_date.day)
    )
class BeMemberFormSerializer(serializers.ModelSerializer):
    age_verbose = serializers.SerializerMethodField()
    class Meta:
        model = BeMemberForm
        fields = '__all__'




    # ✅ Проверка email-домена
    def validate_email(self, value):
        allowed_domains = ['gmail.com', 'mail.ru', 'yandex.ru', 'inbox.ru', 'icloud.com']
        domain = value.split("@")[-1].lower()
        if domain not in allowed_domains:
            raise serializers.ValidationError(
                f"Регистрация разрешена только с доменов: {', '.join(allowed_domains)}"
            )
        return value

    # ✅ Проверка поля "О себе"
    def validate_about_yourself(self, value):
        if value and len(value.strip()) < 20:
            raise serializers.ValidationError("Поле 'О себе' должно быть не короче 20 символов.")
        return value

    # ✅ Проверка на мат и плохие слова
    def validate(self, attrs):
        bad_words = [
            'дурак', 'идиот', 'тупой', 'сука', 'гей', 'геи',
            'пидорасы', 'идите нахуй', 'иди нахуй', 'Иди нахуй'
        ]
        # проверка всех текстовых полей на ненормативную лексику
        text_fields = [
            'about_yourself', 'interested_activities',
            'your_contribution', 'greek_ancestor_relation', 'greek_ancestor_surname'
        ]
        for field in text_fields:
            content = attrs.get(field, '')
            if content:
                lowered = content.lower()
                for word in bad_words:
                    if word in lowered:
                        raise serializers.ValidationError({
                            field: f"Нельзя использовать нецензурную лексику: '{word}'"
                        })
        return attrs

    def update(self, instance, validated_data):
        request = self.context.get('request')

        # Только суперпользователь может менять статус заявки
        if 'status' in validated_data:
            if not request or not request.user.is_superuser:
                raise serializers.ValidationError({
                    'status': "Только администратор может менять статус заявки."
                })

        return super().update(instance, validated_data)
