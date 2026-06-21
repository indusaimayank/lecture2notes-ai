from pathlib import Path

from fastapi import (
    APIRouter,
    HTTPException
)

router = APIRouter(
    prefix="/transcript",
    tags=["Transcript"]
)


@router.get("/{project_id}")
async def get_transcript(
    project_id: str
):

    transcript_file = (
        Path(
            "project_data/projects"
        )
        / project_id
        / "transcripts"
        / "transcript.json"
    )

    if not transcript_file.exists():

        raise HTTPException(
            status_code=404,
            detail="Transcript not found"
        )

    return transcript_file.read_text(
        encoding="utf-8"
    )