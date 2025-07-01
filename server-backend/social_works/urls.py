from django.urls import path

from .admin import BeMemberFormAdmin
from .views import BeMemberFormCreateView

urlpatterns = [
    path('be-member/', BeMemberFormCreateView.as_view(), name='be-member-create'),

]
