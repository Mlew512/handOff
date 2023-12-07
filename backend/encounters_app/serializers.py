from rest_framwork import serializers
from .models import Encounter

class AllEncounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encounter
        feilds ="__all__"