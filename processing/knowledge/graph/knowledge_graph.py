from processing.knowledge.builders.topic_builder import (
    TopicBuilder
)

from processing.knowledge.builders.chapter_builder import (
    ChapterBuilder
)

from processing.knowledge.builders.concept_builder import (
    ConceptBuilder
)

from processing.knowledge.builders.example_builder import (
    ExampleBuilder
)

from processing.knowledge.builders.formula_builder import (
    FormulaBuilder
)

from processing.knowledge.builders.code_builder import (
    CodeBuilder
)

from processing.knowledge.builders.algorithm_builder import (
    AlgorithmBuilder
)


class KnowledgeGraph:

    def __init__(self):

        self.topic_builder = (
            TopicBuilder()
        )

        self.chapter_builder = (
            ChapterBuilder()
        )

        self.concept_builder = (
            ConceptBuilder()
        )

        self.example_builder = (
            ExampleBuilder()
        )

        self.formula_builder = (
            FormulaBuilder()
        )

        self.code_builder = (
            CodeBuilder()
        )

        self.algorithm_builder = (
            AlgorithmBuilder()
        )

    def build(
        self,
        extracted_data: dict
    ):

        return {

            "chapters":
                self.chapter_builder.build(
                    extracted_data.get(
                        "chapters",
                        []
                    )
                ),

            "topics":
                self.topic_builder.build(
                    extracted_data.get(
                        "topics",
                        []
                    )
                ),

            "concepts":
                self.concept_builder.build(
                    extracted_data.get(
                        "concepts",
                        []
                    )
                ),

            "examples":
                self.example_builder.build(
                    extracted_data.get(
                        "examples",
                        []
                    )
                ),

            "formulas":
                self.formula_builder.build(
                    extracted_data.get(
                        "formulas",
                        []
                    )
                ),

            "code":
                self.code_builder.build(
                    extracted_data.get(
                        "code",
                        []
                    )
                ),

            "algorithms":
                self.algorithm_builder.build(
                    extracted_data.get(
                        "algorithms",
                        []
                    )
                )
        }