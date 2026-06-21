from pydantic import BaseModel


class YouTubeRequest(BaseModel):

    url: str
    speed: float = 1.0