from typing import Dict


class GateClassifier:

    KEYWORDS = [
        "gate",
        "previous year question",
        "pyq",
        "marks",
        "exam",
        "rank",
        "cutoff",
        "iit",
        "nits",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "GATE",
            "score": matches,
            "contains_exam_content": True,
        }