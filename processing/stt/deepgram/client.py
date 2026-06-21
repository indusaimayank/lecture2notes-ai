from pathlib import Path

from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
    FileSource
)

from backend.core.config import (
    config
)


class DeepgramClientWrapper:

    def __init__(self):

        if not config.DEEPGRAM_API_KEY:

            raise ValueError(
                "DEEPGRAM_API_KEY not found in .env"
            )

        self.client = DeepgramClient(
            config.DEEPGRAM_API_KEY
        )

    def transcribe_file(
        self,
        audio_path: str
    ):

        audio_file = Path(
            audio_path
        )

        if not audio_file.exists():

            raise FileNotFoundError(
                f"Audio file not found: {audio_path}"
            )

        with open(
            audio_file,
            "rb"
        ) as file:

            payload: FileSource = {
                "buffer": file.read()
            }

        options = (
            PrerecordedOptions(

                model="nova-3",

                smart_format=True,

                punctuate=True,

                paragraphs=True,

                diarize=True,

                detect_language=True,

                utterances=True
            )
        )

        import httpx

        response = (
            self.client.listen
            .rest
            .v("1")
            .transcribe_file(
                payload,
                options,
                timeout=httpx.Timeout(300.0)
            )
        )

        return response
