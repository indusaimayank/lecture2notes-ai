from sqlalchemy import (
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from src.db.base import Base


class Flashcard(Base):

    __tablename__ = "flashcards"

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

    question: Mapped[str] = (
        mapped_column(
            Text
        )
    )

    answer: Mapped[str] = (
        mapped_column(
            Text
        )
    )