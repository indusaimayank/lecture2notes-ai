from backend.services.project_service import (
    ProjectService
)


def main():

    service = ProjectService()

    project = (
        service.create_project(
            title="Demo Lecture",
            source_type="youtube",
            youtube_url=""
        )
    )

    print(project)


if __name__ == "__main__":

    main()