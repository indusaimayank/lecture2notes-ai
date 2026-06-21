from typing import Dict


class ReasoningClassifier:

    KEYWORDS = [
        "puzzle",
        "blood relation",
        "seating arrangement",
        "coding decoding",
        "direction",
        "syllogism",
        "logical",
        "statement",
        "assumption",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Reasoning",
            "score": matches,
            "contains_code": False,
            "contains_formulas": False,
            "contains_numericals": False,
        }