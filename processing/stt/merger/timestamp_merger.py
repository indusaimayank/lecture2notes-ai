class TimestampMerger:

    def merge(
        self,
        transcripts: list
    ):

        merged = []

        offset = 0

        for transcript in transcripts:

            for segment in transcript:

                segment[
                    "start"
                ] += offset

                segment[
                    "end"
                ] += offset

                merged.append(
                    segment
                )

            if transcript:

                offset = merged[
                    -1
                ]["end"]

        return merged