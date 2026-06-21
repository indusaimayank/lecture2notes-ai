import time
from backend.services.storage_service import StorageService
from ai.llm.groq_client import GroqClient

class NotesService:

    def __init__(self):
        self.storage = StorageService()
        self.llm = GroqClient()

    def generate_notes(self, transcript: str, project_path: str) -> str:
        """
        Generates beautifully formatted textbook-style Markdown notes directly from the raw transcript.
        Automatically chunks the transcript to handle massive files (e.g. 6 hour videos) and avoid LLM quota limits.
        """
        # Split transcript into chunks of roughly 15000 characters (~3000-4000 tokens)
        chunk_size = 15000
        chunks = [transcript[i:i+chunk_size] for i in range(0, len(transcript), chunk_size)]
        
        all_notes = []
        
        for i, chunk in enumerate(chunks):
            prompt = f"""
            You are an expert textbook author and educational content creator.
            I am providing you with PART {i+1} of {len(chunks)} of a raw lecture transcript.
            Your task is to extract the key knowledge from this specific part and translate it into a comprehensive, highly readable textbook section in Markdown format.

            Guidelines:
            1. Use proper Markdown hierarchy (## Topics, ### Subtopics). Avoid using # Chapter unless it's part 1.
            2. Make the explanations detailed, fluent, and intuitive. Do not just list bullet points; write cohesive paragraphs.
            3. Format all code blocks properly with language tags. If the transcript discusses algorithms, include dry-runs or step-by-step logic.
            4. Use LaTeX format ($math$) for inline math, and ($$math$$) for block equations.
            5. Use Mermaid code blocks (```mermaid) to visualize any architectures, state machines, workflows, or complex relationships.
            
            RAW TRANSCRIPT PART {i+1}:
            {chunk}
            """

            # Generate notes using the prompt
            print(f"Generating notes for chunk {i+1}/{len(chunks)}...")
            try:
                chunk_notes = self.llm.generate_content(prompt)
                all_notes.append(chunk_notes)
            except Exception as e:
                print(f"Failed to generate notes for chunk {i+1}: {e}")
                all_notes.append(f"\n> [!WARNING]\n> Failed to generate notes for part {i+1} due to an error: {e}\n\n{chunk[:1000]}...")
            
            # Sleep to prevent hitting Groq's TPM (Tokens Per Minute) limit on large files
            if i < len(chunks) - 1:
                print("Sleeping 10s to respect LLM rate limits...")
                time.sleep(10)

        final_notes = "\n\n---\n\n".join(all_notes)

        # Ensure the directory exists and upload to Supabase
        self.storage.save_text(
            f"{project_path}/notes/textbook.md",
            final_notes
        )

        return final_notes