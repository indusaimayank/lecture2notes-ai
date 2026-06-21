import re
from typing import List, Dict


class FormulaExtractor:

    FORMULA_PATTERNS = [
        r"[A-Za-z]+\s*=\s*.+",
        r"F\s*=\s*m\s*a",
        r"E\s*=\s*m\s*c\^?2"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        formulas = []

        for pattern in self.FORMULA_PATTERNS:

            matches = re.findall(
                pattern,
                transcript
            )

            for match in matches:

                formulas.append(
                    {
                        "formula": match
                    }
                )

        return formulas