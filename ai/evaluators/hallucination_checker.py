from typing import Dict


class HallucinationChecker:

    def evaluate(
        self,
        transcript: str,
        notes: str
    ) -> Dict:

        transcript_words = set(
            transcript.lower().split()
        )

        notes_words = set(
            notes.lower().split()
        )

        new_words = (
            notes_words
            - transcript_words
        )

        hallucination_ratio = round(
            len(new_words)
            /
            max(
                len(notes_words),
                1
            ),
            2
        )

        risk = "LOW"

        if hallucination_ratio > 0.4:
            risk = "HIGH"

        elif hallucination_ratio > 0.2:
            risk = "MEDIUM"

        return {
            "hallucination_ratio":
                hallucination_ratio,
            "risk_level":
                risk
        }