from openai import OpenAI
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

load_dotenv()
my_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key = my_api_key)

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

app = FastAPI()


@app.post("/")
def ai_prompt(request: ChatRequest):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system", 
                "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": request.prompt
            }
        ]
    )

    gpt_response = completion.choices[0].message.content
    return ChatResponse(response = gpt_response)

