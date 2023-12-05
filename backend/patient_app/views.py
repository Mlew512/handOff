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


# Create your views here.
class All_patients(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = Patient.objects.all()
        ser_patients = AllPatientsSerializer(patients, many=True)
        return Response(ser_patients.data)


# class An_item(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, item_id):
#         item = Item.objects.get(id=item_id)
#         # print(items, "filtered")
#         serializer = AllItemSerializer(item)
#         # print(serializer,"serialized")
#         return Response(serializer.data)

#     def post(self, request, item_id):
#         new_item = get_object_or_404(Item, id=item_id)
#         user = request.user

#         if not hasattr(user, "cart"):
#             user.cart = (
#                 Cart.objects.create()
#             )  
#             user.save() 

#         cart_item = Cart_item.objects.create(item=new_item, cart=user.cart)
#         response_message = f"{new_item.name} has been added to your cart"
#         return Response(response_message, status=status.HTTP_201_CREATED)
    
#     def delete(self, request, item_id):
#         user = request.user
#         item = get_object_or_404(Item, id=item_id)

#         if hasattr(user, "cart"):
#             cart_item = get_object_or_404(Cart_item, item=item, cart=user.cart)
#             cart_item.delete()
#             return Response(status=HTTP_204_NO_CONTENT)
#         else:
#             return Response("Cart not found", status=status.HTTP_404_NOT_FOUND)
    
# class Item_by_category(APIView):
#     def get(self, request, category):
#         catitems = category.title()
#         items = Item.objects.filter(category=catitems)
#         # print(items, "filtered")
#         serializer = AllItemSerializer(items, many=True)
#         # print(serializer,"serialized")
#         return Response(serializer.data)
