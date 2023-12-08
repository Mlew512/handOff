from django.urls import path
from .views import All_Encounters, An_Encounter

urlpatterns = [
    path("",All_Encounters.as_view(), name = "all_encounters"),
    path("<int:encounter_id>/",An_Encounter.as_view(), name = "an_encounter"),

]