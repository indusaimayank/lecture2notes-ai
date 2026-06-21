from ai.llm.gemini_client import GeminiClient
from ai.prompts.prompt_loader import PromptLoader

class PromptBuilder:
    def __init__(self):
        self.llm = GeminiClient()
        self.base_prompt = PromptLoader.load()

    def build_optimized_prompt(self, profile: dict) -> str:
        """
        Uses an LLM to generate an optimized extraction prompt based on the lecture profile.
        This prompt will later be used by Gemini to extract knowledge from the transcript.
        """
        generation_instructions = f"""
        You are a Prompt Engineering Expert for an educational AI platform.
        Your task is to write an optimized extraction prompt that will be fed into another LLM (Gemini 1.5 Pro).
        
        The lecture being processed has the following profile:
        Subject: {profile.get('subject')}
        Difficulty: {profile.get('difficulty')}
        Teaching Style: {profile.get('teaching_style')}
        Exam Focused: {profile.get('exam_focused')}
        Content Type: {profile.get('content_type')}
        
        Write a detailed prompt that instructs the extraction LLM on exactly how to process the transcript.
        The resulting prompt MUST instruct the extraction LLM to output ONLY a JSON object representing the Knowledge Graph.
        
        Include specific instructions for handling:
        - {profile.get('subject')}-specific concepts (e.g. if Programming: dry runs, code logic, time complexity. if Physics: derivations, intuition, variables.)
        - The target audience ({profile.get('difficulty')})
        - Formatting requirements (Markdown, Mermaid diagrams if applicable)
        
        Here is the Base Prompt structure that the system expects. Use this as a foundation and augment it heavily based on the lecture profile.
        
        BASE PROMPT:
        {self.base_prompt[:1500]}... (truncated)
        
        Output ONLY the finalized extraction prompt text. Do not include markdown codeblocks (```) around the text unless it's part of the prompt itself.
        """
        
        try:
            # We bypass generate_json and use raw text generation for prompt building
            response = self.llm.model.generate_content(generation_instructions)
            return response.text.strip()
        except Exception as e:
            print(f"Failed to generate optimized prompt: {e}")
            return self.base_prompt
