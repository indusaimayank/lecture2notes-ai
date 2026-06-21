from pathlib import Path

from fastapi import (
    APIRouter,
    HTTPException
)

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


@router.get("/{project_id}")
async def get_notes(
    project_id: str
):

    notes_file = (
        Path(
            "project_data/projects"
        )
        / project_id
        / "notes"
        / "textbook.md"
    )

    if not notes_file.exists():

        raise HTTPException(
            status_code=404,
            detail="Notes not found"
        )

    return notes_file.read_text(
        encoding="utf-8"
    )