from typing import Dict


class NotesGenerator:

    def generate(
        self,
        knowledge: Dict
    ) -> str:

        notes = []

        notes.append("# Lecture Notes\n")

        for topic in knowledge.get(
            "topics",
            []
        ):

            notes.append(
                f"## {topic.get('topic')}\n"
            )

        for definition in knowledge.get(
            "definitions",
            []
        ):

            notes.append(
                f"### Definition\n"
                f"{definition.get('definition')}\n"
            )

        for concept in knowledge.get(
            "concepts",
            []
        ):

            notes.append(
                f"### Concept\n"
                f"{concept.get('concept')}\n"
            )

        for example in knowledge.get(
            "examples",
            []
        ):

            notes.append(
                f"### Example\n"
                f"{example.get('example')}\n"
            )

        return "\n".join(notes)