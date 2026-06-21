from typing import List, Dict


class ChapterExtractor:

    CHAPTER_MARKERS = [
        "chapter",
        "module",
        "unit",
        "section"
    ]

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        chapters = []

        lines = transcript.split("\n")

        for line in lines:

            lower = line.lower()

            if any(
                marker in lower
                for marker in self.CHAPTER_MARKERS
            ):
                chapters.append(
                    {
                        "title": line.strip()
                    }
                )

        return chapters