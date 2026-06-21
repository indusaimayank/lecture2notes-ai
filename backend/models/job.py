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


class Job(Base):

    __tablename__ = "jobs"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True
    )

    status: Mapped[str] = (
        mapped_column(
            String
        )
    )

    progress: Mapped[int] = (
        mapped_column()
    )

    created_at: Mapped[datetime] = (
        mapped_column(
            DateTime,
            default=datetime.utcnow
        )
    )