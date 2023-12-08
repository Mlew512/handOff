from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Assessment
from .serializers import AllAssessmentSerializer, AnAssessmentSerializer
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
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class All_Assessments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        assessments = Assessment.objects.all()
        ser_assessment = AllAssessmentSerializer(assessments, many=True)
        return Response(ser_assessment.data)
    
    def post(self, request):
        serializer = AnAssessmentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

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
class An_Assessment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, assessment_id):
        assessments = get_object_or_404(Assessment, id=assessment_id)
        ser_assessment = AllAssessmentSerializer(assessments)
        return Response(ser_assessment.data)
    

    def delete(self,request,assessment_id):
        assessment = get_object_or_404(Assessment, id=assessment_id)
        assessment.delete()
        return Response(status = HTTP_204_NO_CONTENT)
    
    def put(self,request, assessment_id):
        assessment=get_object_or_404(Assessment, id= assessment_id)
        serialized = AnAssessmentSerializer(assessment, data=request.data, partial =True)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=HTTP_204_NO_CONTENT)
        else:
            print(assessment.errors)
            return Response(assessment.errors, status= HTTP_400_BAD_REQUEST)
