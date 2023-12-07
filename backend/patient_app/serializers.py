from rest_framework import serializers
from .models import Patient


class AllPatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields= "__all__"


class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields=  ["id","first_name","last_name","date_of_birth","allergies","past_medical_history","medical_id"]

