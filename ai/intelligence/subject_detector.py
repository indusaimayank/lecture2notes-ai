from typing import Dict

from ai.classifiers.subject_classifier import (
    SubjectClassifier
)


class SubjectDetector:

    def __init__(self):

        self.classifier = (
            SubjectClassifier()
        )

    def detect(
        self,
        transcript: str
    ) -> Dict:

        result = (
            self.classifier.classify(
                transcript
            )
        )

        return {
            "subject":
                result.get(
                    "subject",
                    "Unknown"
                ),
            "confidence":
                result.get(
                    "score",
                    0
                )
        }