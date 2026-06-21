from typing import Dict, List


class FormulaGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> List[Dict]:

        formulas = []

        for formula in knowledge.get(
            "formulas",
            []
        ):

            formulas.append(
                {
                    "formula":
                        formula.get(
                            "formula"
                        )
                }
            )

        return formulas