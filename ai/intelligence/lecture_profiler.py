import json
from ai.llm.gemini_client import GeminiClient

class LectureProfiler:

    def __init__(self):
        self.llm = GeminiClient()

    def profile(self, transcript: str) -> dict:
        prompt = f"""
        You are an expert educational AI profiling a lecture transcript.
        Analyze the following transcript and determine the nature of the lecture.
        Return ONLY a JSON object with the following structure:
        {{
            "subject": "String - The primary subject (e.g., Programming, Physics, Mathematics, English, System Design)",
            "difficulty": "String - The estimated difficulty level (Beginner, Intermediate, Advanced)",
            "teaching_style": "String - The teaching style (e.g., Theoretical, Practical, Problem Solving, Conversational)",
            "exam_focused": "Boolean - True if this seems targeted towards a specific exam (like GATE, Interview Prep, etc.)",
            "content_type": "String - The main type of content (e.g., Tutorial, University Lecture, Crash Course)"
        }}

        Transcript:
        {transcript[:15000]}  # Limiting to 15000 chars for profiling to save tokens/time while keeping enough context
        """

        profile_data = self.llm.generate_json(prompt)
        
        # Fallbacks in case LLM fails
        if not profile_data:
            profile_data = {
                "subject": "Unknown",
                "difficulty": "Intermediate",
                "teaching_style": "General",
                "exam_focused": False,
                "content_type": "Lecture"
            }
            
        return profile_data