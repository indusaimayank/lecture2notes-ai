from typing import Dict


class EducationalValueChecker:

    EDUCATIONAL_TERMS = [
        "definition",
        "concept",
        "example",
        "application",
        "formula",
        "algorithm",
        "practice",
        "question",
        "revision",
        "summary",
    ]

    def evaluate(
        self,
        notes: str
    ) -> Dict:

        text = notes.lower()

        matched = sum(
            1
            for term
            in self.EDUCATIONAL_TERMS
            if term in text
        )

        score = int(
            (
                matched
                /
                len(
                    self.EDUCATIONAL_TERMS
                )
            )
            * 100
        )

        return {
            "educational_score":
                score,
            "matched_features":
                matched
        }