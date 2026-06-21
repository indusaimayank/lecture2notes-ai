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


class Question(Base):

    __tablename__ = "questions"

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

    difficulty: Mapped[str] = (
        mapped_column(
            String
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