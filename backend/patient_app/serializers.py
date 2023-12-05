from rest_framework import serializers
from .models import Patient


class AllPatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields= "__all__"