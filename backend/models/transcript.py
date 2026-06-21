from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from src.db.base import Base


class Transcript(Base):

    __tablename__ = "transcripts"

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

    content: Mapped[str] = (
        mapped_column(
            Text
        )
    )

    created_at: Mapped[datetime] = (
        mapped_column(
            DateTime,
            default=datetime.utcnow
        )
    )