from typing import Dict


class InterviewClassifier:

    KEYWORDS = [
        "interview",
        "hr round",
        "system design",
        "behavioral",
        "coding round",
        "faang",
        "resume",
        "leadership",
    ]

    def classify(self, transcript: str) -> Dict:

        text = transcript.lower()

        matches = sum(
            1
            for keyword in self.KEYWORDS
            if keyword in text
        )

        return {
            "subject": "Interview Preparation",
            "score": matches,
            "contains_interview_content": True,
        }