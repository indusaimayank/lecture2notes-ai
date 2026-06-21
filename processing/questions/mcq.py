class MCQGenerator:

    def generate(
        self,
        knowledge: dict
    ):

        mcqs = []

        for concept in knowledge.get(
            "concepts",
            []
        ):

            mcqs.append(

                {
                    "question":
                        (
                            f"What is "
                            f"{concept.get('concept')}?"
                        ),

                    "options": [

                        "Correct Answer",

                        "Distractor 1",

                        "Distractor 2",

                        "Distractor 3"
                    ],

                    "answer": 0
                }
            )

        return mcqs