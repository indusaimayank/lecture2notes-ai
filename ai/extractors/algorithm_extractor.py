import re
from typing import List, Dict


class AlgorithmExtractor:

    ALGORITHM_KEYWORDS = [
        "algorithm",
        "approach",
        "procedure",
        "step",
        "method"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        results = []

        paragraphs = transcript.split("\n")

        for paragraph in paragraphs:

            text = paragraph.lower()

            if any(
                keyword in text
                for keyword in self.ALGORITHM_KEYWORDS
            ):
                results.append(
                    {
                        "type": "algorithm",
                        "content": paragraph.strip()
                    }
                )

        return results