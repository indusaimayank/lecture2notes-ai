from pydantic import BaseModel


class ExportResponse(
    BaseModel
):

    project_id: str

    export_type: str

    file_url: str