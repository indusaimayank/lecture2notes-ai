from pathlib import Path


class PromptManager:

    PROMPT_FILE = (
        Path(__file__)
        .parent.parent
        / "ai"
        / "prompts"
        / "master_prompt.txt"
    )

    @classmethod
    def load(cls):

        with open(
            cls.PROMPT_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()