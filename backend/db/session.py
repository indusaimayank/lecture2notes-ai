from sqlalchemy import (
    create_engine
)

from sqlalchemy.orm import (
    sessionmaker
)

from src.core.config import (
    config
)

DATABASE_URL = (
    f"postgresql+psycopg://"
    f"postgres:{config.SUPABASE_DB_PASSWORD}"
    f"@{config.SUPABASE_DB_HOST}:5432"
    f"/postgres"
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()