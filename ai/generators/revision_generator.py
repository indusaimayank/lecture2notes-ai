from typing import Dict


class RevisionGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> str:

        lines = []

        lines.append(
            "# Revision Notes\n"
        )

        for concept in knowledge.get(
            "concepts",
            []
        ):

            lines.append(
                f"- {concept.get('concept')}"
            )

        for formula in knowledge.get(
            "formulas",
            []
        ):

            lines.append(
                f"- {formula.get('formula')}"
            )

        return "\n".join(lines)