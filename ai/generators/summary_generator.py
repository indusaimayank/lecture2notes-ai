from typing import Dict


class SummaryGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> str:

        total_topics = len(
            knowledge.get(
                "topics",
                []
            )
        )

        total_concepts = len(
            knowledge.get(
                "concepts",
                []
            )
        )

        total_formulas = len(
            knowledge.get(
                "formulas",
                []
            )
        )

        return (
            f"Topics Covered: {total_topics}\n"
            f"Concepts: {total_concepts}\n"
            f"Formulas: {total_formulas}\n"
        )