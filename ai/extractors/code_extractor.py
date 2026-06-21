import re
from typing import List, Dict


class CodeExtractor:

    CODE_PATTERNS = [
        r"def\s+\w+",
        r"class\s+\w+",
        r"public\s+class",
        r"System\.out",
        r"print\s*\(",
        r"#include"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        results = []

        for pattern in self.CODE_PATTERNS:

            matches = re.findall(
                pattern,
                transcript,
                re.IGNORECASE
            )

            for match in matches:

                results.append(
                    {
                        "code_fragment": match
                    }
                )

        return results