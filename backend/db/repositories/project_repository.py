from sqlalchemy.orm import Session

from src.models.project import (
    Project
)


class ProjectRepository:

    def create(
        self,
        db: Session,
        project: Project
    ):

        db.add(project)

        db.commit()

        db.refresh(project)

        return project

    def get(
        self,
        db: Session,
        project_id: str
    ):

        return (
            db.query(Project)
            .filter(
                Project.id == project_id
            )
            .first()
        )