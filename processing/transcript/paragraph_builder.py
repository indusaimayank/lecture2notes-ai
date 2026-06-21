class ParagraphBuilder:

    def build(
        self,
        text: str
    ):

        sentences = text.split(
            ". "
        )

        paragraphs = []

        chunk = []

        for sentence in sentences:

            chunk.append(
                sentence
            )

            if len(chunk) >= 5:

                paragraphs.append(
                    ". ".join(chunk)
                )

                chunk = []

        if chunk:

            paragraphs.append(
                ". ".join(chunk)
            )

        return paragraphs