from django.urls import path
from .views import Noun_Project, Gptai_Api

urlpatterns = [
    path('noun/<str:subject>/', Noun_Project.as_view(), name="noun_project"), 
    path('summary/', Gptai_Api.as_view(), name="gptai_api"), 
]
    