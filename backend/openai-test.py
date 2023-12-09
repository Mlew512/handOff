import os
from openai import OpenAI
from myapi.settings import env
from requests_oauthlib import OAuth1 


api_key = env.get("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
    ]
)
print(completion)
# print(completion['choices'][0]['message']['content'])
