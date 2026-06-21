class DifficultyRanker:

    def rank(
        self,
        questions: list
    ):

        for index, question in enumerate(
            questions
        ):

            question[
                "rank"
            ] = index + 1

        return questions