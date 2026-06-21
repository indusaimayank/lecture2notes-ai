import re


class TranscriptCleaner:

    def clean(
        self,
        text: str
    ):

        text = re.sub(
            r"\s+",
            " ",
            text
        )

        return text.strip()