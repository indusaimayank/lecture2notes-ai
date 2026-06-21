import os
from groq import Groq

from backend.core.config import config

class GroqClient:

    def __init__(self):
        if not config.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY not found in config")
        
        self.client = Groq(api_key=config.GROQ_API_KEY)
        self.model = "llama-3.3-70b-versatile"

    def generate_content(self, prompt: str) -> str:
        """
        Sends a prompt to Groq and expects a standard text response.
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Failed to generate text from Groq: {str(e)}")
            raise e
