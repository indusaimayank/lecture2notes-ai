from typing import List, Dict


class ExampleExtractor:

    EXAMPLE_MARKERS = [
        "for example",
        "example",
        "consider",
        "let us take"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        examples = []

        paragraphs = transcript.split("\n")

        for paragraph in paragraphs:

            lower = paragraph.lower()

            if any(
                marker in lower
                for marker in self.EXAMPLE_MARKERS
            ):
                examples.append(
                    {
                        "example":
                            paragraph.strip()
                    }
                )

        return examples