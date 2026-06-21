from ai.evaluators.quality_checker import (
    QualityChecker
)

from ai.evaluators.completeness_checker import (
    CompletenessChecker
)

from ai.evaluators.factual_checker import (
    FactualChecker
)

from ai.evaluators.hallucination_checker import (
    HallucinationChecker
)

from ai.evaluators.educational_value_checker import (
    EducationalValueChecker
)


class EvaluationPipeline:

    def __init__(self):

        self.quality = (
            QualityChecker()
        )

        self.completeness = (
            CompletenessChecker()
        )

        self.factual = (
            FactualChecker()
        )

        self.hallucination = (
            HallucinationChecker()
        )

        self.educational = (
            EducationalValueChecker()
        )

    def evaluate(
        self,
        transcript: str,
        notes: str
    ):

        return {

            "quality":
                self.quality.evaluate(
                    transcript,
                    notes
                ),

            "completeness":
                self.completeness.evaluate(
                    notes
                ),

            "factual":
                self.factual.evaluate(
                    notes
                ),

            "hallucination":
                self.hallucination.evaluate(
                    transcript,
                    notes
                ),

            "educational":
                self.educational.evaluate(
                    notes
                )
        }