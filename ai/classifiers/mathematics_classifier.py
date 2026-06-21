from typing import Dict


class MathematicsClassifier:

    KEYWORDS = [
        "integral",
        "derivative",
        "limit",
        "matrix",
        "determinant",
        "probability",
        "permutation",
        "combination",
        "equation",
        "theorem",
        "proof",
        "vector",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Mathematics",
            "score": matches,
            "contains_code": False,
            "contains_formulas": True,
            "contains_numericals": True,
        }