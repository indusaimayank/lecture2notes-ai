from abc import ABC, abstractmethod


class BaseClassifier(ABC):

    @abstractmethod
    def classify(self, transcript: str) -> dict:
        pass