from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
)
from .models import Patient
from .serializers import AllPatientsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# Create your views here.\
# ---get all patients----
class All_patients(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = Patient.objects.all()
        ser_patients = AllPatientsSerializer(patients, many=True)
        return Response(ser_patients.data)


class A_patient(APIView):
    # permission_classes = [IsAuthenticated]
    # ---get patient by patient ID-----
    def get(self, request, patient_id):
        patient = Patient.objects.get(id=patient_id)
        serializer = AllPatientsSerializer(patient)
        return Response(serializer.data)
    
    # def get(self, request, *args, **kwargs):
    #     patient_id = kwargs.get('patient_id')
    #     patient_name = kwargs.get('patient_name')

    #     if patient_id is not None:
    #         # Handle logic for patient_id
    #         patient = get_object_or_404(Patient, id=patient_id)
    #         return HttpResponse(f"Patient ID: {patient.id}, Name: {patient.name}")
    #     elif patient_name is not None:
    #         # Handle logic for patient_name
    #         patient = get_object_or_404(Patient, name=patient_name)
    #         return HttpResponse(f"Patient ID: {patient.id}, Name: {patient.name}")
    #     else:
    #         # Handle other cases or return an error response
    #         return HttpResponse("Invalid request")
    
    # -----add a patient to a users care/ assignment-----

    # def post(self, request, patient_id):
    #     new_item = get_object_or_404(Patient, id=patient_id)
    #     user = request.user

    #     if not hasattr(user, "cart"):
    #         user.cart = (
    #             Cart.objects.create()
    #         )  
    #         user.save() 

    #     cart_item = Cart_item.objects.create(item=new_item, cart=user.cart)
    #     response_message = f"{new_item.name} has been added to your cart"
    #     return Response(response_message, status=status.HTTP_201_CREATED)


    # ----remove a patient from a users care----

#     def delete(self, request, item_id):
#         user = request.user
#         item = get_object_or_404(Item, id=item_id)

#         if hasattr(user, "cart"):
#             cart_item = get_object_or_404(Cart_item, item=item, cart=user.cart)
#             cart_item.delete()
#             return Response(status=HTTP_204_NO_CONTENT)
#         else:
#             return Response("Cart not found", status=status.HTTP_404_NOT_FOUND)


# ----------view patients by unit admitted to--------


# class Item_by_category(APIView):
#     def get(self, request, category):
#         catitems = category.title()
#         items = Item.objects.filter(category=catitems)
#         # print(items, "filtered")
#         serializer = AllItemSerializer(items, many=True)
#         # print(serializer,"serialized")
#         return Response(serializer.data)


# ------------modify patient info (unit admitted to/ PMH/ Allergies)------