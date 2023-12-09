from django.urls import path
from .views import Noun_Project

urlpatterns = [
    path('<str:subject>/', Noun_Project.as_view(), name="noun_project"), 
]
    