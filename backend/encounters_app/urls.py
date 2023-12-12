from django.urls import path
from .views import All_Encounters, An_Encounter, All_Encounters_Pt

urlpatterns = [
    path("",All_Encounters.as_view(), name = "all_encounters"),
    path("<int:encounter_id>/",An_Encounter.as_view(), name = "an_encounter"),
    path("patient/<int:patient_id>/",All_Encounters_Pt.as_view(), name = "all_encounters_pt"),

]