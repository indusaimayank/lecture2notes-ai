from typing import Dict


class CompletenessChecker:

    REQUIRED_SECTIONS = [
        "definition",
        "example",
        "summary",
        "application"
    ]

    def evaluate(
        self,
        notes: str
    ) -> Dict:

        notes_lower = notes.lower()

        found = []

        missing = []

        for section in self.REQUIRED_SECTIONS:

            if section in notes_lower:
                found.append(section)
            else:
                missing.append(section)

        score = int(
            (
                len(found)
                /
                len(
                    self.REQUIRED_SECTIONS
                )
            )
            * 100
        )

        return {
            "completeness_score":
                score,
            "found_sections":
                found,
            "missing_sections":
                missing
        }