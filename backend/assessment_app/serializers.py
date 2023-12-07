from .models import Assessment
from patient_app.serializers import AllPatientsSerializer
from encounters_app.serializers import AllEncounterSerializer
from user_app.serializers import AClientSerializer
from rest_framework import serializers

class AllAssessmentSerializer(serializers.ModelSerializer):
    # patient= AllPatientsSerializer()
    encounter= AllEncounterSerializer()
    provider = AClientSerializer()
    class Meta:
        model = Assessment
        # fields= "__all__"
        fields =["encounter","provider","assessment_time","neuro","cardio","respiratory","gastrointestinal","genitourinary"]  