from fastapi import APIRouter, HTTPException, BackgroundTasks
from backend.schemas.youtube import YouTubeRequest
from backend.services.youtube_service import YouTubeService
from backend.services.storage_service import StorageService

router = APIRouter(
    prefix="/youtube",
    tags=["Youtube"]
)

youtube_service = YouTubeService()
storage_service = StorageService()

@router.post("/process")
async def process_youtube(
    request: YouTubeRequest,
    background_tasks: BackgroundTasks
):
    try:
        # Initialize project and return ID immediately
        project_id = youtube_service.init_project(request.url)

        # Kick off background processing
        background_tasks.add_task(
            youtube_service.process_youtube_task,
            project_id=project_id,
            youtube_url=request.url,
            speed=request.speed
        )

        return {
            "status": "success",
            "message": "Processing started in background",
            "project_id": project_id
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/status/{project_id}")
async def get_status(project_id: str):
    try:
        status_data = storage_service.load_json(f"project_data/projects/{project_id}/status.json")
        return status_data
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail="Status not found for this project"
        )