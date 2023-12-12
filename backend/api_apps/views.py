import os
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1
from myapi.settings import env
import logging
import pprint
from rest_framework import status
import json
from django.core.exceptions import ImproperlyConfigured

# Create your views here.


class Noun_Project(APIView):
    def get(self, request, subject):
        auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
        endpoint = f"https://api.thenounproject.com/v2/icon?query={subject}"
        # endpoint = "https://api.thenounproject.com/v2/icon?query=c#"

        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        pp = pprint.PrettyPrinter(indent=2, depth=2)
        pp.pprint(responseJSON)
        return Response(responseJSON["icons"][0]["thumbnail_url"])


logger = logging.getLogger(__name__)


class Gptai_Api(APIView):
    def post(self, request):
        try:
            api_key = env.get("OPENAI_API_KEY")
            if not api_key:
                raise ImproperlyConfigured(
                    "OPENAI_API_KEY is not set in the environment."
                )

            client = OpenAI(api_key=api_key)

            prompt = request.data.get("prompt", "")
            if not prompt:
                return Response(
                    {"error": "Prompt is required in the request data."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            logger.info(f"Received prompt: {prompt}")

            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "user",
                        "content": """
    ###instruction###
    you are here to assist medical professionals in patient handoff. 
    summarize the given data following the example format provided.
    DO NOT preface the response with "here is a summary of" or "from the data provided."

    ###Example###
    here is the format I want the response:

    "neuro": {
        "summary": "(summarize the nuero assessment data from the prompt passed below in a couple sentences)",
        "data": {
            "cognition": (summarize the information from the prompt),
            "cranial nerves": (summarize the information from the prompt),
            "motor function": (summarize the information from the prompt),
            "sensation": (summarize the information from the prompt),
            "reflexes": (summarize the information from the prompt)
        }
    },
    "cardiac": {
        "summary": "(summarize the cardiac assessments data from the prompt passed below in a couple sentences)",
        "data": {
            "heart rate": (summarize the information from the prompt),
            "blood pressure": (summarize the information from the prompt),
            "heart rhythm": (summarize the information from the prompt),
            "edema": (summarize the information from the prompt)
        }
    },
    "respiratory": {
        "summary": "(summarize the respiratory assessment data from the prompt passed below in a couple sentences)",
        "data": {
            "respiratory rate": (summarize the information from the prompt),
            "oxygen saturation": (summarize the information from the prompt),
            "lung sounds": (summarize the information from the prompt),
            "cough": (summarize the information from the prompt)
        }
    },
    "GI": {
        "summary": "(summarize the GI assessment data from the prompt passed below in a couple sentences)",
        "data": {
            "bowel sounds": (summarize the information from the prompt),
            "appetite": (summarize the information from the prompt),
            "abdominal pain": (summarize the information from the prompt),
            "bowel movements": (summarize the information from the prompt)
        }
    },
    "GU": {
        "summary": "(summarize the GU assessment data from the prompt passed below in a couple sentences)",
        "data": {
            "urine output": (summarize the information from the prompt),
            "voiding without difficulty": (summarize the information from the prompt),
            "no urinary retention": (summarize the information from the prompt),
            "no urinary incontinence":(summarize the information from the prompt)
        }
    },
    "careplan Recommendation": "(create one nursing careplan recommendation taking into consideration the patient's assessment data and the diagnosis from the encounter data, response should be less than 2 sentences)"
    }

    only analyze this data: "{prompt}"

    """,
                    },
                ],
            )
            print(prompt)
            response_content = completion.choices[0].message.content
            response_dict = json.loads(response_content)
            print(response_content)
            return Response({"response_content": response_dict})
        except Exception as e:
            # Log the exception
            logger.error(f"An error occurred: {str(e)}")
            return Response(
                {"error": "An error occurred while processing the request."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
