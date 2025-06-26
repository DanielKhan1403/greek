from rest_framework import serializers
from .models import BeMemberForm

class BeMemberFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeMemberForm
        fields = '__all__'

    def validate_email_address(self, value):
        allowed_domains = ['gmail.com', 'mail.ru', 'yandex.ru', 'inbox.ru', 'icloud.com']
        domain = value.split("@")[-1]
        if domain not in allowed_domains:
            raise serializers.ValidationError(
                f"Регистрация разрешена только с доменов: {', '.join(allowed_domains)}")
        return value



    def validate_message(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError("Сообщение должно быть не короче 20 символов.")
        return value

    def validate(self, attrs):
        bad_words = ['дурак', 'идиот', 'тупой', 'сука', 'гей', 'геи', 'пидорасы', 'идите нахуй','иди нахуй','Иди нахуй']
        message = attrs.get('message', '').lower()
        for word in bad_words:
            if word in message:
                raise serializers.ValidationError({
                    'message': f"не матерись да по-братски: '{word}'"
                })
        return attrs