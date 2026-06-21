from src.ai.intelligence.lecture_profiler import (
    LectureProfiler
)


class IntelligenceJob:

    def run(
        self,
        transcript: str
    ):

        profiler = LectureProfiler()

        return profiler.profile(
            transcript
        )