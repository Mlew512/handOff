from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Client
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import AllClientSerializer, TheClientSerializer


class Sign_up(APIView):
    def post(self, request):
        try:
            request.data["username"] = request.data["email"]
            client = Client.objects.create_user(**request.data)
            token = Token.objects.create(user=client)
            return Response(
                {"client": client.email, "token": token.key}, status=HTTP_201_CREATED
            )
        except Exception as e:
            print(e)
            return Response("Something went Wrong", status= HTTP_400_BAD_REQUEST)
class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        client = authenticate(username=email, password=password)
        
        if client:
            user_id = client.id

            # You can store the user ID in the session if needed
            request.session["user_id"] = user_id

            token, created = Token.objects.get_or_create(user=client)
            return Response({"token": token.key, "client": client.email, "user_id": user_id})
        else:
            return Response("Incorrect username or password", status=HTTP_404_NOT_FOUND)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        if "user_id" in request.session:
            del request.session["user_id"]
            
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = AllClientSerializer(request.user)
        return Response(user.data)
    def put(self,request):
        user = TheClientSerializer(request.user, data = request.data, partial= True)
        if user.is_valid():
            user.save()
            return Response(user.data)
        return Response(user.errors, status = HTTP_400_BAD_REQUEST)
