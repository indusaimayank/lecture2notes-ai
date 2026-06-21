from typing import Dict, List


class MCQGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> List[Dict]:

        mcqs = []

        for definition in knowledge.get(
            "definitions",
            []
        ):

            mcqs.append(
                {
                    "question":
                        "What is the correct definition?",
                    "options": [
                        definition.get(
                            "definition"
                        ),
                        "Option B",
                        "Option C",
                        "Option D"
                    ],
                    "answer": 0
                }
            )

        return mcqs