from rest_framework import serializers
from .models import Client
from patient_app.serializers import AllPatientsSerializer


class AllClientSerializer(serializers.ModelSerializer):
    assignments = AllPatientsSerializer(many=True)

    class Meta:
        model = Client
        fields= ['profession','first_name','last_name','assignments', 'username','id']

class AClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields= ['profession','first_name','last_name']

class TheClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields= ['profession','first_name','last_name','assignments', 'username','id']