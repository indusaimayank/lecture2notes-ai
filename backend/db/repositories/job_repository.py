from sqlalchemy.orm import Session

from src.models.job import Job


class JobRepository:

    def create(
        self,
        db: Session,
        job: Job
    ):

        db.add(job)

        db.commit()

        db.refresh(job)

        return job

    def update_status(
        self,
        db: Session,
        job_id: str,
        status: str
    ):

        job = (
            db.query(Job)
            .filter(
                Job.id == job_id
            )
            .first()
        )

        if job:

            job.status = status

            db.commit()

        return job