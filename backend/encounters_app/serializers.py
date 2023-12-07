from rest_framework import serializers
from .models import Encounter
from patient_app.serializers import AllPatientsSerializer

class AllEncounterSerializer(serializers.ModelSerializer):
    patient_id= AllPatientsSerializer()
    class Meta:
        model = Encounter
        fields =["id","patient_id","admitted_date","admitted","diagnosis"]