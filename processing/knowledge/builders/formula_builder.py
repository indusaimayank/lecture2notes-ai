class FormulaBuilder:

    def build(
        self,
        formulas: list
    ):

        return [

            {
                "formula": formula
            }

            for formula in formulas
        ]