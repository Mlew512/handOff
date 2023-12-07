from .models import Encounter
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
)
from .serializers import AllEncounterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status




# Create your views here.
class All_Encounters(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        encounters = Encounter.objects.all()
        ser_encounter = AllEncounterSerializer(encounters, many=True)
        return Response(ser_encounter.data)
