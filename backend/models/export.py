from sqlalchemy import (
    String,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from src.db.base import Base


class Export(Base):

    __tablename__ = "exports"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True
    )

    project_id: Mapped[str] = (
        mapped_column(
            ForeignKey(
                "projects.id"
            )
        )
    )

    export_type: Mapped[str] = (
        mapped_column(
            String
        )
    )

    file_url: Mapped[str] = (
        mapped_column(
            String
        )
    )