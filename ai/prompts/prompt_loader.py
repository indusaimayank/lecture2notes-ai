from pathlib import Path


class PromptLoader:

    PROMPT_FILE = (
        Path(__file__).parent
        / "master_prompt.txt"
    )

    @classmethod
    def load(cls) -> str:

        with open(
            cls.PROMPT_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()