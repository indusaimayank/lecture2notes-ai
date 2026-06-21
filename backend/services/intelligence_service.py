from ai.intelligence.lecture_profiler import (
    LectureProfiler
)

from backend.services.storage_service import (
    StorageService
)


class IntelligenceService:

    def __init__(self):

        self.profiler = (
            LectureProfiler()
        )

        self.storage = (
            StorageService()
        )

    def analyze(
        self,
        transcript: str,
        project_path: str
    ):

        profile = (
            self.profiler.profile(
                transcript
            )
        )

        self.storage.save_json(
            f"{project_path}/"
            "intelligence/"
            "profile.json",
            profile
        )

        return profile