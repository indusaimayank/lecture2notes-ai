from typing import Dict


class EnglishClassifier:

    KEYWORDS = [
        "grammar",
        "noun",
        "verb",
        "adjective",
        "adverb",
        "idiom",
        "phrase",
        "vocabulary",
        "synonym",
        "antonym",
        "tense",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "English",
            "score": matches,
            "contains_code": False,
            "contains_formulas": False,
            "contains_numericals": False,
        }