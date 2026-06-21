from backend.db.base import Base
from backend.db.session import engine

from backend.models.project import Project
from backend.models.transcript import Transcript


def migrate():

    Base.metadata.create_all(
        bind=engine
    )

    print(
        "Database migrated."
    )


if __name__ == "__main__":

    migrate()