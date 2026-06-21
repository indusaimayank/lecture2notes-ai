from backend.services.storage_service import StorageService
from ai.llm.gemini_client import GeminiClient
import json

class FlashcardService:

    def __init__(self):
        self.storage = StorageService()
        self.llm = GeminiClient()

    def generate_study_materials(self, knowledge: dict, project_path: str):
        """
        Translates the knowledge graph into Flashcards and a Question Bank using Gemini.
        """
        prompt = f"""
        You are an expert educator.
        I will provide you with a structured Knowledge Graph (JSON format) extracted from a lecture.
        Your task is to generate active recall study materials.
        
        Output ONLY a JSON object containing two arrays:
        1. "flashcards": An array of objects with "question" and "answer" fields. Make these concise and focused on definitions, formulas, and key concepts.
        2. "question_bank": An array of objects with "type" (e.g., "MCQ", "Subjective", "Interview"), "question", "options" (if MCQ), and "answer".
        
        KNOWLEDGE GRAPH:
        {knowledge}
        """

        try:
            materials = self.llm.generate_json(prompt)
            
            # Save Flashcards
            if "flashcards" in materials:
                self.storage.save_json(
                    f"{project_path}/flashcards/flashcards.json",
                    materials["flashcards"]
                )
                
            # Save Question Bank
            if "question_bank" in materials:
                self.storage.save_json(
                    f"{project_path}/questions/questions.json",
                    materials["question_bank"]
                )
                
            return materials
        except Exception as e:
            print(f"Failed to generate study materials: {e}")
            return {"flashcards": [], "question_bank": []}