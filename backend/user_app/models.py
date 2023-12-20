from django.db import models
from django.contrib.auth.models import AbstractUser
from patient_app.models import Patient

PROFESSION_TYPE = (
    ("Registered Nurse", "REGISTERED NURSE"),
    ("physician", "Physician"),
)


# Create your models here.
class Client(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    profession = models.CharField(
        max_length=16, choices=PROFESSION_TYPE, default="Registered Nurse"
    )
    assignments = models.ManyToManyField(Patient, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email, self.profession
