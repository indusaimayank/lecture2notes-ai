from sqlalchemy.orm import Session

from src.models.transcript import (
    Transcript
)


class TranscriptRepository:

    def create(
        self,
        db: Session,
        transcript: Transcript
    ):

        db.add(transcript)

        db.commit()

        db.refresh(transcript)

        return transcript