from django.db import models
from patient_app.models import Patient
from user_app.models import Client

class Encounter(models.Model):
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    admitted_date = models.DateTimeField(auto_now_add=True, blank=True)
    admitted = models.BooleanField(default=True) 
    diagnosis = models.CharField(max_length=255)