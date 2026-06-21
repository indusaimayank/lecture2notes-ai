from ai.classifiers.programming_classifier import ProgrammingClassifier
from ai.classifiers.mathematics_classifier import MathematicsClassifier
from ai.classifiers.physics_classifier import PhysicsClassifier
from ai.classifiers.english_classifier import EnglishClassifier
from ai.classifiers.aptitude_classifier import AptitudeClassifier
from ai.classifiers.reasoning_classifier import ReasoningClassifier
from ai.classifiers.gate_classifier import GateClassifier
from ai.classifiers.interview_classifier import InterviewClassifier


class SubjectClassifier:

    def __init__(self):

        self.classifiers = [
            ProgrammingClassifier(),
            MathematicsClassifier(),
            PhysicsClassifier(),
            EnglishClassifier(),
            AptitudeClassifier(),
            ReasoningClassifier(),
            GateClassifier(),
            InterviewClassifier(),
        ]

    def classify(self, transcript: str):

        results = [
            classifier.classify(transcript)
            for classifier in self.classifiers
        ]

        best_match = max(
            results,
            key=lambda x: x["score"]
        )

        return best_match