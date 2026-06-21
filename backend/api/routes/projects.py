from fastapi import APIRouter

from backend.schemas.project import (
    CreateProjectRequest,
    ProjectResponse
)

from backend.services.project_service import (
    ProjectService
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

project_service = ProjectService()


@router.post(
    "/",
    response_model=ProjectResponse
)
async def create_project(
    request: CreateProjectRequest
):

    project = project_service.create_project(
        title=request.title,
        source_type=request.source_type,
        youtube_url=request.youtube_url or ""
    )

    return {
        "id": project["project_id"],
        "title": request.title,
        "source_type": request.source_type,
        "status": "created"
    }


@router.get("/{project_id}")
async def get_project(
    project_id: str
):

    return {
        "project_id": project_id
    }