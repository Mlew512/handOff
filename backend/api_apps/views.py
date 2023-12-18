import os
from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
from requests_oauthlib import OAuth1
from myapi.settings import env
import logging
from rest_framework import status
import json
from django.core.exceptions import ImproperlyConfigured
import requests


logger = logging.getLogger(__name__)

class Noun_Project(APIView):
    def get(self, request, subject):
        auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
        endpoint = f"https://api.thenounproject.com/v2/icon?query={subject}"

        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        if response.status_code == 200:
            responseJSON = response.json()
            return Response(responseJSON["icons"][0]["thumbnail_url"])
        else:
            return Response({"error": "Failed to fetch Noun Project icon"}, status=response.status_code)


class Gptai_Api(APIView):
    def post(self, request):
        try:
            api_key = env.get("OPENAI_API_KEY")
            if not api_key:
                raise ImproperlyConfigured("OPENAI_API_KEY is not set in the environment.")

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
                        "role": "system",
                        "content": """
                        you are a nurse, fluent in medical terminology and identifying trends in a patient's status and recommending care plans for nurses, you create summaries of data for assisting nurses give patient turnover reports. here is an example of a sucessfull prompt and response. use it to model your response but interpret the information from the prompt for the trends in the summary. 

                        ###Example###
                        {
                            "neuro":{
                                "summary": "summarize the neuro assessment data from the prompt passed below in a couple sentences, if there are any changes in mental status you should say here",
                                "trends": "identify trends of the patients nuero status here from all the assessments passes",
                                "major_events": "summarize any major nuero events though out the shift here",               
                            },
                            "cardiac": {
                                "summary": "summarize the cardiac assessments data from the prompt passed below in a couple sentences",
                                "trends": "identify trends of the patients cardiac status based off of the assessment data given",
                                "major_events": "summarize any major cardiac events from the assessments passed",   
                            },
                            "respiratory": {
                                "summary": "summarize the respiratory assessment data from the prompt passed below in a couple sentences",
                                "trends": "identify trends of the patients respiratory status here from all the assessments given",
                                "major_events": "summarize any major respiratory events though out the shift here",   
                            },
                            "GI": {
                                "summary": "summarize the GI assessment data from the prompt passed below in a couple sentences",
                                "trends": "identify trends of the patients gi status here from all the assessments passed",
                                "major_events": "summarize any major GI events though out the shift here",   
                            },
                            "GU": {
                                "summary": "summarize the GU assessment data from the prompt passed below in a couple sentences",
                                "trends": "identify trends of the patients GU status here from all the assessments passed",
                                "major_events": "summarize any major GU events though out the shift here",   
                            },
                            "careplan": {
                                "summary":"create one nursing careplan recommendation taking into consideration the patient's assessment data and the diagnosis from the encounter data, response should be less than 3 sentences",
                                "rational":"using data from the assessments back up why you are recommending this careplan with subjective and objective data",
                            },
                        }
                        }
                        """,
                    },
                    {
                        "role": "user",
                        "content": """{prompt}
                        """,
                    },
                    {
                        "role": "assistant",
                        "content": """
                        ###assistant_instruction###
                        identify the trends for each body system in the summarize section and provide a concise summary about all the assessments provided. the summary should include any pertanant fluxuations in the patients status and any major events. response Must be in JSON format. 
                        ...
                        """,
                    },
                ],
            )
            print(prompt)
            response_content = completion.choices[0].message.content
            print(response_content)
            response_dict = json.loads(response_content)

            return Response({"response_content": response_dict})

        except Exception as e:
            # Log the exception
            logger.error(f"An error occurred: {str(e)}")
            return Response(
                {"error": "An error occurred while processing the request."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
