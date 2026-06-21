from backend.services.storage_service import StorageService
from ai.llm.gemini_client import GeminiClient

class ExportService:

    def __init__(self):
        self.storage = StorageService()
        self.llm = GeminiClient()

    def generate_latex(self, markdown_notes: str, project_path: str) -> str:
        """
        Converts textbook markdown notes into a fully compilable LaTeX document.
        """
        prompt = f"""
        You are an expert LaTeX typesetter.
        I will provide you with a Markdown textbook chapter.
        Convert it entirely into a fully standalone, compilable LaTeX document.
        
        Requirements:
        1. Include standard packages (amsmath, amssymb, graphicx, hyperref, listings, xcolor, tikz).
        2. Set up the document class as an 'article' or 'report'.
        3. Convert all Markdown headers (#, ##) to \\section, \\subsection, etc.
        4. Convert all Markdown code blocks to LaTeX \\begin{{lstlisting}} environments.
        5. Convert all Markdown math to valid LaTeX math modes.
        6. If there are Mermaid diagrams in the Markdown, translate them into TikZ diagrams or explicitly note them as placeholders if TikZ is too complex.
        
        Output ONLY the raw LaTeX code. Do not wrap it in markdown codeblocks (no ```latex).
        
        MARKDOWN:
        {markdown_notes}
        """

        try:
            latex_doc = self.llm.model.generate_content(prompt).text.strip()
            
            # Remove any trailing/leading markdown blocks if the LLM adds them
            if latex_doc.startswith("```latex"):
                latex_doc = latex_doc[8:]
            if latex_doc.startswith("```"):
                latex_doc = latex_doc[3:]
            if latex_doc.endswith("```"):
                latex_doc = latex_doc[:-3]
                
            self.storage.save_text(
                f"{project_path}/exports/notes.tex",
                latex_doc.strip()
            )
            return latex_doc
            
        except Exception as e:
            print(f"Failed to generate LaTeX: {e}")
            return ""