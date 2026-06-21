from src.services.project_service import (
    ProjectService
)


class CreateProjectJob:

    def run(
        self,
        title: str,
        source_type: str,
        youtube_url: str = ""
    ):

        service = ProjectService()

        return service.create_project(
            title=title,
            source_type=source_type,
            youtube_url=youtube_url
        )