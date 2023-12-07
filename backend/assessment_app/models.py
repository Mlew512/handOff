from django.db import models
from patient_app.models import Patient
from user_app.models import Client
from encounters_app.models import Encounter

class Assessment(models.Model):
    encounter = models.ForeignKey(Encounter, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    provider = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True)
    assessment_time = models.DateTimeField(auto_now_add=True, blank=True)
    neuro = models.CharField(max_length=255)
    cardio = models.CharField(max_length=255)
    respiratory = models.CharField(max_length=255)
    gastrointestinal = models.CharField(max_length=255)
    genitourinary = models.CharField(max_length=255)




