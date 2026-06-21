from typing import Dict


class FactualChecker:

    FACT_PATTERNS = [
        "according to",
        "defined as",
        "formula",
        "theorem",
        "law of",
    ]

    def evaluate(
        self,
        notes: str
    ) -> Dict:

        text = notes.lower()

        fact_count = sum(
            1
            for pattern
            in self.FACT_PATTERNS
            if pattern in text
        )

        return {
            "factual_score":
                min(
                    fact_count * 20,
                    100
                ),
            "fact_indicators":
                fact_count
        }