from ai.llm.gemini_client import GeminiClient

class KnowledgeExtractor:

    def __init__(self):
        self.llm = GeminiClient()

    def extract(self, transcript: str, optimized_prompt: str) -> dict:
        """
        Extracts the full hierarchical knowledge graph from the transcript using the optimized prompt.
        """
        extraction_instructions = f"""
        {optimized_prompt}
        
        TRANSCRIPT TO PROCESS:
        {transcript}
        """
        
        knowledge_graph = self.llm.generate_json(extraction_instructions)
        
        if not knowledge_graph:
            # Fallback to empty structure if extraction fails
            knowledge_graph = {
                "chapters": [],
                "topics": [],
                "concepts": [],
                "definitions": [],
                "examples": [],
                "formulas": [],
                "algorithms": [],
                "code": [],
                "questions": []
            }
            
        return knowledge_graph