from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import BeMemberForm
from .serializers import BeMemberFormSerializer
from .models import BeMemberForm
from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.styles import Font, Border, Side, Alignment

from datetime import datetime
# Create your views here.



class BeMemberFormCreateView(APIView):
    def post(self, request):
        serializer = BeMemberFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Заявка успешно отправлена."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



