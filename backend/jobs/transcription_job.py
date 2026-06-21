from src.services.transcript_service import (
    TranscriptService
)


class TranscriptionJob:

    def run(
        self,
        audio_path: str,
        project_path: str
    ):

        service = TranscriptService()

        return service.transcribe_audio(
            audio_path,
            project_path
        )