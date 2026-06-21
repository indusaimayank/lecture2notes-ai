import re
from typing import List, Dict


class QuestionExtractor:

    def extract(
        self,
        transcript: str
    ) -> List[Dict]:

        questions = []

        matches = re.findall(
            r"[^.!?]*\?",
            transcript
        )

        for match in matches:

            questions.append(
                {
                    "question":
                        match.strip()
                }
            )

        return questions