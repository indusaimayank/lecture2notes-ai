class InterviewQuestionGenerator:

    def generate(
        self,
        knowledge: dict
    ):

        questions = []

        for concept in knowledge.get(
            "concepts",
            []
        ):

            questions.append(

                {
                    "question":
                        (
                            "Explain "
                            + concept.get(
                                "concept",
                                ""
                            )
                        )
                }
            )

        return questions