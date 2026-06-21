from typing import List, Dict


class ConceptExtractor:

    CONCEPT_MARKERS = [
        "is defined as",
        "refers to",
        "means",
        "concept of",
        "can be understood as"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        concepts = []

        paragraphs = transcript.split("\n")

        for paragraph in paragraphs:

            text = paragraph.lower()

            if any(
                marker in text
                for marker in self.CONCEPT_MARKERS
            ):
                concepts.append(
                    {
                        "concept": paragraph.strip()
                    }
                )

        return concepts