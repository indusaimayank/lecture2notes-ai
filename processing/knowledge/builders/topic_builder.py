class TopicBuilder:

    def build(
        self,
        topics: list
    ):

        return [

            {
                "name": topic
            }

            for topic in topics
        ]