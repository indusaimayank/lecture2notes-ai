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


class User(Base):

    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True
    )

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(
        String,
        nullable=True
    )

    created_at: Mapped[datetime] = (
        mapped_column(
            DateTime,
            default=datetime.utcnow
        )
    )