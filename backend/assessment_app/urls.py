from django.urls import path
from .views import All_Assessments, All_Encounter_Assessments

urlpatterns = [
    path("",All_Assessments.as_view(), name = "all_assessments"),
    path("<int:encounter_id>/",All_Encounter_Assessments.as_view(), name = "all_encounter_assessments"),
]