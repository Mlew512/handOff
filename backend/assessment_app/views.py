from .models import Assessment
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
)
from .serializers import AllAssessmentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# Create your views here.
class All_Assessments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        assessments = Assessment.objects.all()
        ser_assessment = AllAssessmentSerializer(assessments, many=True)
        return Response(ser_assessment.data)
    
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Assessment
from .serializers import AllAssessmentSerializer

class All_Encounter_Assessments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('patient_id')
        encounter_id = kwargs.get('encounter_id')

        if patient_id is not None:
            assessments = Assessment.objects.filter(patient_id=patient_id)
        elif encounter_id is not None:
            assessments = Assessment.objects.filter(encounter_id=encounter_id)
        else:
            # Handle other cases or return an error response
            return Response("Invalid request parameters", status=status.HTTP_400_BAD_REQUEST)

        if not assessments.exists():
            return Response("No assessments found", status=status.HTTP_404_NOT_FOUND)

        serializer = AllAssessmentSerializer(assessments, many=True)
        return Response(serializer.data)
