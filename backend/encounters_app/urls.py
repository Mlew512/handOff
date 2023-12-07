from django.urls import path
from .views import All_Encounters

urlpatterns = [
    path("",All_Encounters.as_view(), name = "all_encounters"),
]