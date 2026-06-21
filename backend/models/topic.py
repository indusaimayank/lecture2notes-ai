from sqlalchemy import (
    String,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from src.db.base import Base


class Topic(Base):

    __tablename__ = "topics"

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

    name: Mapped[str] = (
        mapped_column(
            String
        )
    )