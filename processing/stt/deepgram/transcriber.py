from processing.stt.deepgram.client import (
    DeepgramClientWrapper
)


class DeepgramTranscriber:

    def __init__(self):

        self.client = (
            DeepgramClientWrapper()
        )

    def transcribe(
        self,
        audio_path: str
    ):

        response = (
            self.client
            .transcribe_file(
                audio_path
            )
        )

        result = response.to_dict()

        text = ""

        try:

            text = (
                result["results"]
                ["channels"][0]
                ["alternatives"][0]
                ["transcript"]
            )

        except Exception:

            text = ""

        return {

            "text": text,

            "raw_response": result
        }
