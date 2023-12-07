from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
)
from .models import Patient
from .serializers import AllPatientsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# Create your views here.\
# ---get all patients----
class All_patients(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = Patient.objects.all()
        ser_patients = AllPatientsSerializer(patients, many=True)
        return Response(ser_patients.data)


class A_patient(APIView):
    permission_classes = [IsAuthenticated]
    # ---get patient by patient ID-----
    # def get(self, request, patient_id):
    #     patient = Patient.objects.get(id=patient_id)
    #     serializer = AllPatientsSerializer(patient)
    #     return Response(serializer.data)
    
    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('patient_id')
        last_name = kwargs.get('last_name')


        if patient_id is not None:
            # Handle logic for patient_id
            patient = get_object_or_404(Patient, id=patient_id)
            serializer= AllPatientsSerializer(patient)
            return Response(serializer.data)
        elif last_name is not None:
            # Handle logic for patient_name
            patient = get_object_or_404(Patient, last_name=last_name)
            serializer= AllPatientsSerializer(patient)
            return Response(serializer.data)
        else:
            # Handle other cases or return an error response
            return Response("No client matching credentials", status=HTTP_404_NOT_FOUND)

# ----------view patients by unit admitted to--------


# class Item_by_category(APIView):
#     def get(self, request, category):
#         catitems = category.title()
#         items = Item.objects.filter(category=catitems)
#         # print(items, "filtered")
#         serializer = AllItemSerializer(items, many=True)
#         # print(serializer,"serialized")
#         return Response(serializer.data)


# ------------modify patient info (unit admitted to/ PMH/ Allergies)------