from src.ai.generators.mcq_generator import (
    MCQGenerator
)


class QuestionJob:

    def run(
        self,
        knowledge: dict
    ):

        generator = MCQGenerator()

        return generator.generate(
            knowledge
        )