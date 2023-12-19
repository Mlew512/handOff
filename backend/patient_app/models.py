from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    sex=models.CharField(max_length=50, blank= True, null=True)
    date_of_birth = models.DateField()
    allergies = models.TextField(blank=True, null=True)
    past_medical_history = models.TextField(blank=True, null=True)
    medical_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.medical_id}"
    
