from processing.transcript.transcript_pipeline import (
    TranscriptPipeline
)


class TranscriptService:

    def __init__(self):

        self.pipeline = (
            TranscriptPipeline()
        )

    def generate_transcript(
        self,
        audio_path: str,
        project_path: str
    ):

        return self.pipeline.process(
            audio_path=audio_path,
            project_path=project_path
        )
