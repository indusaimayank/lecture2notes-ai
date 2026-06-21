import uuid

from backend.db.session import (
    SessionLocal
)

from backend.models.project import (
    Project
)


def seed():

    db = SessionLocal()

    project = Project(

        id=str(
            uuid.uuid4()
        ),

        title="Operating Systems",

        source_type="youtube",

        status="completed"
    )

    db.add(project)

    db.commit()

    db.close()

    print(
        "Seed complete."
    )


if __name__ == "__main__":

    seed()