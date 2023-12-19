from django.urls import path
from .views import All_patients, A_patient

urlpatterns = [
    path("",All_patients.as_view(), name = "all_patients"),
    path("<int:patient_id>/", A_patient.as_view(), name= "a_patient"),
    path("<str:last_name>/", A_patient.as_view(), name="a_patient_by_last_name"),

]
