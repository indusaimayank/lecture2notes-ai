from pydantic import BaseModel


class NotesResponse(
    BaseModel
):

    project_id: str

    notes: str