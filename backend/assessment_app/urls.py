from django.urls import path
from .views import All_Assessments, All_Encounter_Assessments, An_Assessment, An_Assessment_Id, Gpt_Assessment_Id

urlpatterns = [
    path("",All_Assessments.as_view(), name = "all_assessments"),
    path("encounter/<int:encounter_id>/",All_Encounter_Assessments.as_view(), name = "all_encounter_assessments"),
    path("<int:assessment_id>/",An_Assessment.as_view(), name="an assessment"),
    path("encounter/<int:encounter_id>/",An_Assessment_Id.as_view(), name="assessments by encounter"),
    path("gpt/<int:encounter_id>/",Gpt_Assessment_Id.as_view(), name="assessments by encounter for gpt"),

]
