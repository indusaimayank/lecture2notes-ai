class TranscriptFormatter:

    def format(
        self,
        transcript: dict
    ):

        return {

            "text": transcript.get(
                "text",
                ""
            ),

            "segments":
                transcript.get(
                    "segments",
                    []
                )
        }