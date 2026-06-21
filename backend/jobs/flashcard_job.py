from src.ai.generators.flashcard_generator import (
    FlashcardGenerator
)


class FlashcardJob:

    def run(
        self,
        knowledge: dict
    ):

        generator = (
            FlashcardGenerator()
        )

        return generator.generate(
            knowledge
        )