import os
from openai import OpenAI
from myapi.settings import env
from requests_oauthlib import OAuth1 
import pprint



api_key = env.get("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "you are a nurse, fluent in medical terminology and identifying trends in a patients status and recommending careplans for nurses"},
        {"role": "user", "content": "create a summary of the following vital signs in a less than 3 paragraphs, time: 00:00, heartRate: 75, bloodPressure: 120/80, respirationRate: 16, painLevel: 2, oxygenSaturation: 98, time: 01:00, heartRate: 78, bloodPressure: 122/82, respirationRate: 18, painLevel: 1, oxygenSaturation: 97, time: 02:00, heartRate: 80, bloodPressure: 118/78, respirationRate: 20, painLevel: 3, oxygenSaturation: 96,time: 03:00, heartRate: 82, bloodPressure: 124/85, respirationRate: 22, painLevel: 2, oxygenSaturation: 95,time: 04:00, heartRate: 85, bloodPressure: 130/88, respirationRate: 20, painLevel: 10, oxygenSaturation: 80,time: 05:00, heartRate: 88, bloodPressure: 126/82, respirationRate: 18, painLevel: 3, oxygenSaturation: 97, time: 06:00, heartRate: 90, bloodPressure: 128/85, respirationRate: 16, painLevel: 2, oxygenSaturation: 98, time: 07:00, heartRate: 92, bloodPressure: 122/80, respirationRate: 18, painLevel: 1, oxygenSaturation: 97, time: 08:00, heartRate: 95, bloodPressure: 120/78, respirationRate: 20, painLevel: 3, oxygenSaturation: 96,time: 09:00, heartRate: 98, bloodPressure: 128/85, respirationRate: 22, painLevel: 2, oxygenSaturation: 95,time: 10:00, heartRate: 100, bloodPressure: 130/88, respirationRate: 20, painLevel: 4, oxygenSaturation: 96, time: 11:00, heartRate: 105, bloodPressure: 126/82, respirationRate: 18, painLevel: 3, oxygenSaturation: 97, time: 12:00, heartRate: 110, bloodPressure: 128/85, respirationRate: 16, painLevel: 2, oxygenSaturation: 98,"}
    ]
)
pp=pprint.PrettyPrinter(indent=2, depth=2)
pp.pprint(completion.choices[0].message.content)
# print(completion['choices'][0]['message']['content'])
