from django.urls import path
from .views import All_patients

urlpatterns = [
    path("",All_patients.as_view(), name = "all_patients"),
]
