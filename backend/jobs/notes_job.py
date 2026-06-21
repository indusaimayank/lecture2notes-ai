from src.services.notes_service import (
    NotesService
)


class NotesJob:

    def run(
        self,
        transcript: str,
        project_path: str
    ):

        service = NotesService()

        return service.generate_notes(
            transcript,
            project_path
        )