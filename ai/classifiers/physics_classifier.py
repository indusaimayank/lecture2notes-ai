from typing import Dict


class PhysicsClassifier:

    KEYWORDS = [
        "force",
        "velocity",
        "acceleration",
        "momentum",
        "newton",
        "energy",
        "work done",
        "power",
        "electric field",
        "magnetic field",
        "current",
        "voltage",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Physics",
            "score": matches,
            "contains_code": False,
            "contains_formulas": True,
            "contains_numericals": True,
        }