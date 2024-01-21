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
            setup_message = {
                "role": "system",
                "content": """
                                you are an expert Trauma Icu nurse, fluent in medical terminology and identifying trends in a patient's status and recommending care plans for nurses, you create summaries of data for assisting nurses give patient turnover reports. here is an example of a sucessfull prompt and response. use it to model your response but interpret the information from the prompt for the trends in the summary as the primary source of information, do NOT make up information that is not provided. response must be in json format. 

                                The following 2 messages are an example conversation between a user and you. the 3rd message is instructions for you. 
                                """,
            }

            first_prompt = {
                "role": "user",
                "content": """
                                summarize this assessment data: 0:{
                                    "encounter": 18,
                                    "assessment_time": "2023-12-19T19:00:23.359763Z",
                                    "neuro": "Alert and oriented x4, pupils 3mm round reactive to light and accomidating, sensation intact, movies all extremities",
                                    "cardio": "pulses +2 all extremities, s1s2 audible, cappilary refill less than 3 seconds, ",
                                    "respiratory": "clear to auscultation bilaterally, saturating at 95% on 2l nasal cannula,chest tube present on L side ",
                                    "gastrointestinal": "abdomen tender llq, soft non distended abdomen, no bowelmovemnt since admission",
                                    "genitourinary": "800ml urine output this morning"
                                    },
                                    1:{
                                    "encounter": 1,
                                    "assessment_time": "2023-12-20T23:00:06.214666Z",
                                    "neuro": "alert and oriented x1, pupils 3mm,  pearrla, moves all extremities",
                                    "cardio": "tachycardic, blood pressure within normal limits",
                                    "respiratory": "hyperventilating, on 10 lpm of oxygen via non-re breather mask, diminished breath sounds on the right side, oxygen saturation between 80% to 91%, chest tube in place on L side",
                                    "gastrointestinal": "bs active x4 quadrants, abdomen non-tender and soft",
                                    "genitourinary": "uop 40-50ml hr"
                                    }          
                            }
                                """,
            }

            first_response = {
                "role": "assistant",
                "content": """

                                sample response
                                {
                                    "neuro": {
                                        "summary": "The patients mental status fluxuated between a&ox4-a&0x1, with the decrease happening at the assessment at 23:00, the patients pupils remained at 3mm and pearrla throughout the assessments. and sensation and movement was maintained throughout the shift."
                                    },
                                    "cardiac": {
                                        "summary": "patients hr went up during the 23:00 assement blood pressure was within normal limits"
                                    },
                                    "respiratory": {
                                        "summary": "patients respiratory status deteriorated at the 23:00 assessment, patient was hyperventilating and required increase oxygen via a non-rebreather mask at 10lpm, with deminished breath sounds on the left side."
                                    },
                                    ***continue this pattern for the rest of the body systems givin in the assessment data. 
                                    "careplan": {
                                        "summary": "based on the assessment data given, you should sit the patient up if possible to help increase the respiratory capacity of the lungs. ensure patency of the chest tube is maintained and assessed frequently" 
                                    },
                                }
                                    
                                """,
            }
            last_prompt = {
                "role": "assistant",
                "content": """
                        ###assistant_instruction###
                        identify the trends for each body system in the summarize section and provide a concise summary about all the assessments provided. the summary should include any changes between the assesments in the patients status and any major events such as change in mental status or change in respiratory status. response Must be in JSON format. 
                        ...
                        """,
            }
            formated_prompt = f" sumarize this assessment data: {prompt} like the example i gave you in the previous 2 messages but DO NOT COPY THE CONTENT OF THE EXAMPLE CONVERSATION"
            actual_prompt = {
                "role": "user",
                "content": """{formated_prompt}
                                """,
            }

            if not prompt:
                return Response(
                    {"error": "Prompt is required in the request data."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            logger.info(f"Received prompt: {prompt}")

            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    setup_message,
                    first_prompt,
                    first_response,
                    actual_prompt,
                    last_prompt,
                ],
                temperature=0.2,
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
            return Response(
                {"error": "Failed to fetch Noun Project icon"},
                status=response.status_code,
            )
