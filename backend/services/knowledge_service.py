from ai.extractors.knowledge_extractor import (
    KnowledgeExtractor
)

from backend.services.storage_service import (
    StorageService
)


class KnowledgeService:

    def __init__(self):

        self.extractor = (
            KnowledgeExtractor()
        )

        self.storage = (
            StorageService()
        )

    def build_knowledge(
        self,
        transcript: str,
        optimized_prompt: str,
        project_path: str
    ):

        knowledge = (
            self.extractor.extract(
                transcript,
                optimized_prompt
            )
        )

        self.storage.save_json(
            f"{project_path}/"
            "knowledge/"
            "knowledge.json",
            knowledge
        )

        return knowledge