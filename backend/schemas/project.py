from typing import Optional

from pydantic import BaseModel


class CreateProjectRequest(BaseModel):

    title: str
    source_type: str
    youtube_url: Optional[str] = None


class ProjectResponse(BaseModel):

    id: str
    title: str
    source_type: str
    status: str