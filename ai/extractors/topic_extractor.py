from typing import List, Dict


class TopicExtractor:

    TOPIC_MARKERS = [
        "today we will discuss",
        "topic is",
        "we will learn",
        "in this lecture"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        topics = []

        paragraphs = transcript.split("\n")

        for paragraph in paragraphs:

            lower = paragraph.lower()

            if any(
                marker in lower
                for marker in self.TOPIC_MARKERS
            ):
                topics.append(
                    {
                        "topic":
                            paragraph.strip()
                    }
                )

        return topics