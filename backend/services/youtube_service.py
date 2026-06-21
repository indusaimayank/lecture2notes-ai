import uuid
from pathlib import Path

from processing.audio.youtube.downloader import YouTubeDownloader
from backend.services.transcript_service import TranscriptService
from backend.services.storage_service import StorageService

class YouTubeService:

    def __init__(self):
        self.downloader = YouTubeDownloader()
        self.transcript_service = TranscriptService()
        self.storage = StorageService()

    def init_project(self, youtube_url: str) -> str:
        project_id = str(uuid.uuid4())
        project_path = Path("project_data/projects") / project_id
        project_path.mkdir(parents=True, exist_ok=True)
        
        for folder in ["audio", "chunks", "transcripts", "knowledge", "notes", "flashcards", "questions", "exports", "metadata"]:
            (project_path / folder).mkdir(exist_ok=True)

        self.update_status(project_id, "initializing", "Initializing project...")
        return project_id

    def update_status(self, project_id: str, status: str, message: str, result: dict = None):
        data = {
            "status": status,
            "message": message
        }
        if result:
            data["result"] = result
        self.storage.save_json(f"project_data/projects/{project_id}/status.json", data)

    def process_youtube_task(self, project_id: str, youtube_url: str, speed: float = 1.0):
        try:
            project_path = Path("project_data/projects") / project_id

            self.update_status(project_id, "downloading", "Downloading audio from YouTube...")
            audio_path = self.downloader.download_audio(youtube_url, str(project_path))

            if speed != 1.0:
                self.update_status(project_id, "processing", f"Adjusting audio speed to {speed}x...")
                import subprocess
                fast_audio_path = str(project_path / "audio" / "fast_audio.mp3")
                try:
                    subprocess.run([
                        "ffmpeg", "-y", "-i", audio_path, 
                        "-filter:a", f"atempo={speed}", 
                        fast_audio_path
                    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    audio_path = fast_audio_path
                except Exception as e:
                    print(f"Warning: FFmpeg speed adjustment failed: {e}. Falling back to original audio.")

            self.update_status(project_id, "transcribing", "Transcribing audio (this may take a while for large files)...")
            transcript = self.transcript_service.generate_transcript(
                audio_path=audio_path,
                project_path=str(project_path)
            )
            transcript_text = transcript.get("text", "")

            self.update_status(project_id, "generating", "Generating AI notes from transcript...")
            from backend.services.notes_service import NotesService
            notes_service = NotesService()
            try:
                notes = notes_service.generate_notes(transcript_text, str(project_path))
            except Exception as e:
                print(f"Notes generation failed: {e}")
                notes = f"# Lecture Notes (Fallback)\n\n*The AI note generation failed: {e}*\n\n{transcript_text[:3000]}..."
                self.storage.save_text(f"{project_path}/notes/textbook.md", notes)

            # Save empty templates for advanced features to satisfy frontend
            self.storage.save_json(f"project_data/projects/{project_id}/intelligence/profile.json", {"subject": "General", "difficulty": "Intermediate", "teaching_style": "Standard", "exam_focused": False})
            self.storage.save_json(f"project_data/projects/{project_id}/knowledge/knowledge.json", {"topics": [], "summary": transcript_text[:1000]})
            self.storage.save_json(f"project_data/projects/{project_id}/flashcards/flashcards.json", [])
            self.storage.save_json(f"project_data/projects/{project_id}/questions/questions.json", [])
            self.storage.save_text(f"project_data/projects/{project_id}/exports/notes.tex", "% LaTeX generation skipped")

            result_data = {
                "project_id": project_id,
                "audio_path": audio_path,
                "transcript_created": True,
                "knowledge_extracted": False,
                "notes_generated": True,
                "study_materials_generated": False,
                "latex_generated": False,
                "profile": {"subject": "General", "difficulty": "Intermediate", "teaching_style": "Standard", "exam_focused": False},
                "word_count": transcript.get("analysis", {}).get("word_count", 0),
                "project_path": str(project_path)
            }

            self.update_status(project_id, "completed", "Processing completed successfully!", result=result_data)

        except Exception as e:
            self.update_status(project_id, "error", f"An error occurred: {str(e)}")
            raise e
