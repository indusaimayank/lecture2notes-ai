from typing import Dict


class ProgrammingClassifier:

    KEYWORDS = [
        "function",
        "variable",
        "class",
        "object",
        "python",
        "java",
        "cpp",
        "algorithm",
        "array",
        "linked list",
        "binary tree",
        "stack",
        "queue",
        "time complexity",
        "space complexity",
        "debug",
        "compiler",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Programming",
            "score": matches,
            "contains_code": True,
            "contains_formulas": False,
            "contains_numericals": False,
        }