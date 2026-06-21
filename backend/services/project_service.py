import uuid
from pathlib import Path


class ProjectService:

    BASE_DIR = (
        Path("project_data/projects")
    )

    def create_project(
        self,
        title: str,
        source_type: str,
        youtube_url: str = ""
    ):

        project_id = str(
            uuid.uuid4()
        )

        project_dir = (
            self.BASE_DIR
            / project_id
        )

        folders = [

            "metadata",
            "audio",
            "chunks",
            "transcripts",
            "intelligence",
            "knowledge",
            "notes",
            "flashcards",
            "questions",
            "exports"
        ]

        for folder in folders:

            (
                project_dir
                / folder
            ).mkdir(
                parents=True,
                exist_ok=True
            )

        return {
            "project_id":
                project_id,
            "title":
                title,
            "path":
                str(project_dir)
        }