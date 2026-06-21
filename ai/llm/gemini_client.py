import os
import json
import google.generativeai as genai

from backend.core.config import config

class GeminiClient:

    def __init__(self):
        if not config.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY not found in config")
        
        genai.configure(api_key=config.GEMINI_API_KEY)
        # Using Gemini 3.1 Flash Lite as seen in user's prompt and model list
        self.model = genai.GenerativeModel('gemini-3.1-flash-lite')

    def generate_json(self, prompt: str) -> dict:
        """
        Sends a prompt to Gemini and expects a JSON response.
        """
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json"
                )
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"Failed to generate JSON from Gemini: {str(e)}")
            return {}
