from sqlalchemy.orm import Session

from src.models.notes import Notes


class NotesRepository:

    def create(
        self,
        db: Session,
        notes: Notes
    ):

        db.add(notes)

        db.commit()

        db.refresh(notes)

        return notes