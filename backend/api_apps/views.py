from rest_framework.views import APIView
from rest_framework.response import Response
import requests 
from requests_oauthlib import OAuth1 
from myapi.settings import env
import pprint

# Create your views here.

class Noun_Project(APIView):
    def get(self, request,subject):
        auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
        endpoint = f"https://api.thenounproject.com/v2/icon?query={subject}"
        # endpoint = "https://api.thenounproject.com/v2/icon?query=c#"

        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        pp=pprint.PrettyPrinter(indent=2, depth=2)
        pp.pprint(responseJSON)
        return Response(responseJSON['icons'][0]['thumbnail_url'])