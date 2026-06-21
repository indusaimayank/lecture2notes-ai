from typing import Dict


class QualityChecker:

    def evaluate(
        self,
        transcript: str,
        notes: str
    ) -> Dict:

        transcript_words = len(
            transcript.split()
        )

        notes_words = len(
            notes.split()
        )

        compression_ratio = round(
            notes_words / max(
                transcript_words,
                1
            ),
            2
        )

        score = 100

        if compression_ratio < 0.15:
            score -= 25

        if notes_words < 500:
            score -= 20

        return {
            "quality_score": max(
                score,
                0
            ),
            "transcript_words":
                transcript_words,
            "notes_words":
                notes_words,
            "compression_ratio":
                compression_ratio
        }