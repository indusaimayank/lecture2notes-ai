from pydantic import BaseModel


class TranscriptResponse(
    BaseModel
):

    project_id: str

    transcript: str