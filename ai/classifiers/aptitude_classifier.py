from typing import Dict


class AptitudeClassifier:

    KEYWORDS = [
        "percentage",
        "profit",
        "loss",
        "time and work",
        "ratio",
        "average",
        "speed",
        "distance",
        "boat",
        "stream",
        "simple interest",
        "compound interest",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Aptitude",
            "score": matches,
            "contains_code": False,
            "contains_formulas": True,
            "contains_numericals": True,
        }