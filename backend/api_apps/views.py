import os
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
import requests 
from requests_oauthlib import OAuth1 
from myapi.settings import env
import pprint
from rest_framework import status

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
    

class Gptai_Api(APIView):
    def get(self, request):
        api_key = env.get("OPENAI_API_KEY")
        client = OpenAI(api_key=api_key)

        prompt = request.data.get('prompt', '')
        if not prompt:
            return Response({'error': 'Prompt is required in the request data.'}, status=status.HTTP_400_BAD_REQUEST)


        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "you are a nurse, fluent in medical terminology and identifying trends in a patients status and recommending careplans for nurses, you create summaries of data for assisting nurses give patient turnover reports "},
                {"role": "user", "content": """
                 ###instruction###
                 summarize into the following format:
                "BP: between 140-120 sys, 90-80 dia
                 HR: between 100-80 bpm
                 RR: between 12-20 bpm
                 SP02: between 90%-100% 
                 pain: between 2-4 "
                 ###Data###
                keep the instructions in mind while summerizing this:{prompt}
                 """
                }
            ]
        )
        # print(completion)
        # pp=pprint.PrettyPrinter(indent=2, depth=2)
        response_content = completion.choices[0].message.content
        return Response({'response_content': response_content})
        # print(completion['choices'][0]['message']['content'])
