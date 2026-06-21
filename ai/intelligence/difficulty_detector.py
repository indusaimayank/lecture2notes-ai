from typing import Dict


class DifficultyDetector:

    EASY_WORDS = [
        "basic",
        "introduction",
        "beginner",
        "overview"
    ]

    ADVANCED_WORDS = [
        "optimization",
        "proof",
        "advanced",
        "research",
        "architecture",
        "distributed"
    ]

    def detect(
        self,
        transcript: str
    ) -> Dict:

        text = transcript.lower()

        easy_score = sum(
            word in text
            for word in self.EASY_WORDS
        )

        advanced_score = sum(
            word in text
            for word in self.ADVANCED_WORDS
        )

        if advanced_score > easy_score:

            level = "Advanced"

        elif advanced_score == easy_score:

            level = "Intermediate"

        else:

            level = "Beginner"

        return {
            "difficulty": level
        }