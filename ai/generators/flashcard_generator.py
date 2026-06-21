from typing import Dict, List


class FlashcardGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> List[Dict]:

        cards = []

        for definition in knowledge.get(
            "definitions",
            []
        ):

            cards.append(
                {
                    "question":
                        "Define:",
                    "answer":
                        definition.get(
                            "definition"
                        )
                }
            )

        return cards