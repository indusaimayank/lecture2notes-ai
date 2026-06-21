class TimestampMapper:

    def map(
        self,
        segments: list
    ):

        return [

            {
                "start":
                    segment.get(
                        "start"
                    ),

                "end":
                    segment.get(
                        "end"
                    ),

                "text":
                    segment.get(
                        "text"
                    )
            }

            for segment in segments
        ]