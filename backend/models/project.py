from datetime import datetime

from sqlalchemy import (
    String,
    DateTime
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from src.db.base import Base


class Project(Base):

    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True
    )

    title: Mapped[str] = mapped_column(
        String
    )

    source_type: Mapped[str] = (
        mapped_column(
            String
        )
    )

    youtube_url: Mapped[str] = (
        mapped_column(
            String,
            nullable=True
        )
    )

    status: Mapped[str] = (
        mapped_column(
            String,
            default="created"
        )
    )

    created_at: Mapped[datetime] = (
        mapped_column(
            DateTime,
            default=datetime.utcnow
        )
    )