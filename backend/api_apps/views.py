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
        return Response(responseJSON["icons"][0]["thumbnail_url"])

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
                        you are a nurse, fluent in medical terminology and identifying trends in a patient's status and recommending care plans for nurses, you create summaries of data for assisting nurses give patient turnover reports. here is an example of a prompt and a response DO NOT SEND THIS BACK AS A RESPONSE, CHANGE THE RESPONSE BASED ON THE ASSESSMENT DATA I SEND YOU.
                        ###Example###
                        prompt: {
                            encounter_diagnosis:"subdural hematoma"
                            0:{
                                "encounter": 1, 
                                "patient": 1,
                                "provider": 1,    
                                "assessment_time": "2023-12-06T12:45:00",
                                "neuro": "alert and oriented x4, pearrla, pupils 3mm, moves all extremities, sensation intact, speech clear",
                                "cardio": "heart sounds s1s2 audible, cappilary refill < 3 seconds, pulses +2 all extremities, tachycardic, normotensive",
                                "respiratory": "lungs clear to auscultation, left lower lobe crackles",
                                "gastrointestinal": "Bowel sounds active x4 quadrants, 1 bowelmovement at 1130, diet NPO",
                                "genitourinary": "foley catheter, urine output dark yellow at 30ml/hr"
                            },
                            1:{
                                "encounter": 1,
                                "patient": 1,
                                "provider": 1,
                                "assessment_time": "2023-12-06T13:30:00",
                                "neuro": "alert and oriented x2, pearrla, pupils 3mm, moves all extremities, sensation intact, speech muffled",
                                "cardio": "heart sounds s1s2 audible, cappilary refill < 3 seconds, pulses +2 all extremities, tachycardic, normotensive",
                                "respiratory": "lungs clear to auscultation, left lower lobe crackles",
                                "gastrointestinal": "Bowel sounds active x4 quadrants, diet NPO",
                                "genitourinary": "foley catheter, urine output dark yellow at 50ml/hr"
                            }
                            2:{
                                "encounter": 1,
                                "patient": 1,
                                "provider": 1,
                                "assessment_time": "2023-12-06T15:30:00",
                                "neuro": "alert and oriented x4, pearrla, pupils 3mm, moves all extremities, sensation intact, speech clear",
                                "cardio": "heart sounds s1s2 audible, cappilary refill < 3 seconds, pulses +2 all extremities, tachycardic, normotensive",
                                "respiratory": "lungs clear to auscultation, left lower lobe crackles",
                                "gastrointestinal": "Bowel sounds active x4 quadrants, diet NPO",
                                "genitourinary": "foley catheter, urine output dark yellow at 50ml/hr"
                            }
                        }
                        sample good response:
                            "neuro": {
                                "summary": "patient's mental alertness changed from alert and oriented x4-2 at 1330 but returned to a&0x4 at the 1530 assessment",
                                "data": {
                                    "cognition": "alert to person and place but not situation and time during the 1530 assessment",
                                    "cranial nerves": "intact",
                                    "motor function": "patient moves all extremities at every assessement",
                                    "sensation": "remained intact during the shift",
                                    "reflexes": "cough & gag reflex pressent"
                                }               
                            },
                            "cardiac": {
                                "summary": "patient remained normotensive, with heart rate within normal range during the last 3 assessments",
                                "data": {
                                    "heart rate": "remained between 80-100bpm through the shift",
                                    "blood pressure": "between 120-140/80-85mmhg",
                                    "heart rhythm": "normal sinus", 
                                    "edema": "no edema present"
                                }
                            },
                            "respiratory": {
                                "summary": "patients respiratory status remained stable though the shift, patient is on 3lpm of oxygen though a nasal canula, breathing is unlabored and patient has maintained oxygen saturations above 92% the entire shift",
                                "data": {
                                    "respiratory rate": "between 12-20bpm",
                                    "oxygen saturation": "92-100%",
                                    "lung sounds": "clear to auscultation in all lobes",
                                    "cough": "none present"
                                }
                            },
                            "GI": {
                                "summary": "Throughout the shift, bowel function remained normal",
                                "data": {
                                    "bowel sounds": "bowel sounds remained present throughout the shift",
                                    "appetite": "normal apetite through out the shift",
                                    "abdominal pain": "No abdominal pain reported throughout the shift",
                                    "bowel movements": "prior to admission"
                                }
                            },
                            "GU": {
                                "summary": "patient maintained adequate urine output throughout the shift with a foley catheter, urine remained dark yellow",
                                "data": {
                                    "urine output": "between 30-50ml/hr",
                                    "voiding without difficulty": true,
                                    "no urinary retention": true,
                                    "no urinary incontinence": "unable to assess"
                                },
                            },
                            "careplan Recommendation": "ensure neuro assessments are completed at scheduled intervals and maintain a quiet dark environment during the night and a bright environment during the day to promote adequate rest and to prevent ICU delirium"
                        }
                        """,
                    },
                    {
                        "role": "user",
                        "content": """
                        ###instruction###
                        you are here to assist medical professionals in patient handoff. 
                        summarize the given data following the example format provided.
                        DO NOT preface the response with "here is a summary of" or "from the data provided."
                        DO NOT just respond with the example given in the system message

                        ###Example###
                        here is the format that the response has to be:
                        {
                            "neuro":{
                                "summary": (summarize the neuro assessment data from the prompt passed below in a couple sentences),
                                "data": {
                                    "cognition": (summarize the information from the prompt),
                                    "cranial nerves": (summarize the information from the prompt),
                                    "motor function": (summarize the information from the prompt),
                                    "sensation": (summarize the information from the prompt),
                                    "reflexes": (summarize the information from the prompt)
                                }               
                            },
                            "cardiac": {
                                "summary": (summarize the cardiac assessments data from the prompt passed below in a couple sentences),
                                "data": {
                                    "heart rate": (summarize the information from the prompt),
                                    "blood pressure": (summarize the information from the prompt),
                                    "heart rhythm": (summarize the information from the prompt),
                                    "edema": (summarize the information from the prompt)
                                }
                            },
                            "respiratory": {
                                "summary": (summarize the respiratory assessment data from the prompt passed below in a couple sentences)"
                                "data": {
                                    "respiratory rate": (summarize the information from the prompt),
                                    "oxygen saturation": (summarize the information from the prompt),
                                    "lung sounds": (summarize the information from the prompt),
                                    "cough": (summarize the information from the prompt)
                                }
                            },
                            "GI": {
                                "summary": (summarize the GI assessment data from the prompt passed below in a couple sentences),
                                "data": {
                                    "bowel sounds": (summarize the information from the prompt),
                                    "appetite": (summarize the information from the prompt),
                                    "abdominal pain": (summarize the information from the prompt),
                                    "bowel movements": (summarize the information from the prompt)
                                }
                            },
                            "GU": {
                                "summary": (summarize the GU assessment data from the prompt passed below in a couple sentences),
                                "data": {
                                    "urine output": (summarize the information from the prompt),
                                    "voiding without difficulty": (summarize the information from the prompt),
                                    "no urinary retention": (summarize the information from the prompt),
                                    "no urinary incontinence": (summarize the information from the prompt)
                                },
                            },
                            "careplan": (create one nursing careplan recommendation taking into consideration the patient's assessment data and the diagnosis from the encounter data, response should be less than 2 sentences)
                        }
                        }
                        use this data to complete the request: {prompt}
                        """,
                    },
                ],
            )

            response_content = completion.choices[0].message.content
            print("Response Content:", response_content)
            response_dict = json.loads(response_content)

            return Response({"response_content": response_dict})

        except Exception as e:
            # Log the exception
            logger.error(f"An error occurred: {str(e)}")
            return Response(
                {"error": "An error occurred while processing the request."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
