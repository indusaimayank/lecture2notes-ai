from faster_whisper import (
    WhisperModel
)


class FasterWhisperEngine:

    def __init__(
        self,
        model_name="base"
    ):

        self.model = (
            WhisperModel(
                model_name
            )
        )

    def transcribe(
        self,
        audio_path: str
    ):

        segments, _ = (
            self.model.transcribe(
                audio_path
            )
        )

        text = []

        for segment in segments:

            text.append(
                segment.text
            )

        return {

            "text":
                " ".join(text)
        }