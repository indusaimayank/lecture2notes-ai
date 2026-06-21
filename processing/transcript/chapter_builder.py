class ChapterBuilder:

    def build(
        self,
        topics: list
    ):

        chapters = []

        for index, topic in enumerate(
            topics
        ):

            chapters.append(

                {
                    "chapter":
                        index + 1,

                    "title":
                        topic
                }
            )

        return chapters