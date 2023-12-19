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
from django.db.models import Q


class All_patients(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = Patient.objects.all()
        ser_patients = AllPatientsSerializer(patients, many=True)
        return Response(ser_patients.data)
    
    def post(self, request):
        serializer = AllPatientsSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class A_patient(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('patient_id')
        last_name = kwargs.get('last_name')


        if patient_id is not None:
            patient = get_object_or_404(Patient, id=patient_id)
            serializer= AllPatientsSerializer(patient)
            return Response(serializer.data)
        elif last_name is not None:
            patients = Patient.objects.filter(Q(first_name__istartswith=last_name) | Q(last_name__istartswith=last_name))
            serializer = AllPatientsSerializer(patients, many=True)
            return Response(serializer.data)
        else:
            return Response("No client matching credentials", status=HTTP_404_NOT_FOUND)
        
    def delete(self,request,patient_id):
        patient = get_object_or_404(Patient, id=patient_id)
        patient.delete()
        return Response(status = HTTP_204_NO_CONTENT)    
    
    def put(self,request, patient_id):
        patient=get_object_or_404(Patient, id=patient_id)
        serialized = AllPatientsSerializer(patient, data=request.data, partial =True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=HTTP_204_NO_CONTENT)
        else:
            print(patient.errors)
            return Response(patient.errors, status= HTTP_400_BAD_REQUEST)
    


# ----------view patients by unit admitted to--------

# ------------modify patient info (unit admitted to/ PMH/ Allergies)------