class ChapterBuilder:

    def build(
        self,
        chapters: list
    ):

        return [

            {
                "title": chapter
            }

            for chapter in chapters
        ]