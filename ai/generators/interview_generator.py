from typing import Dict, List


class InterviewGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> List[Dict]:

        questions = []

        for concept in knowledge.get(
            "concepts",
            []
        ):

            questions.append(
                {
                    "question":
                        (
                            "Explain: "
                            + concept.get(
                                "concept",
                                ""
                            )
                        )
                }
            )

        return questions