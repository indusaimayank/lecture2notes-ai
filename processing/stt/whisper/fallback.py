from processing.whisper.faster_whisper import (
    FasterWhisperEngine
)


class WhisperFallback:

    def __init__(self):

        self.whisper = (
            FasterWhisperEngine()
        )

    def transcribe(
        self,
        audio_path: str
    ):

        return self.whisper.transcribe(
            audio_path
        )