from typing import Dict


class CheatSheetGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> str:

        lines = []

        lines.append(
            "# Cheat Sheet\n"
        )

        for concept in knowledge.get(
            "concepts",
            []
        ):

            lines.append(
                f"• {concept.get('concept')}"
            )

        for formula in knowledge.get(
            "formulas",
            []
        ):

            lines.append(
                f"• {formula.get('formula')}"
            )

        return "\n".join(lines)