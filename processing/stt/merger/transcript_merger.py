class TranscriptMerger:

    def merge(
        self,
        transcripts: list
    ):

        full_text = []

        for transcript in transcripts:

            full_text.append(
                transcript.get(
                    "text",
                    ""
                )
            )

        return "\n".join(
            full_text
        )