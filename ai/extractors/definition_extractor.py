from typing import List, Dict


class DefinitionExtractor:

    DEFINITION_MARKERS = [
        "definition",
        "defined as",
        "is called",
        "refers to"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        definitions = []

        paragraphs = transcript.split("\n")

        for paragraph in paragraphs:

            lower = paragraph.lower()

            if any(
                marker in lower
                for marker in self.DEFINITION_MARKERS
            ):
                definitions.append(
                    {
                        "definition":
                            paragraph.strip()
                    }
                )

        return definitions