from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
my_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key = my_api_key)

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system", 
            "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Write a haiku about a cold day."
        }
    ]
)

print("response: ", completion.choices[0].message)