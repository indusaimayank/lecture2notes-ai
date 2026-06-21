from typing import Dict


class ContentTypeDetector:

    def detect(
        self,
        transcript: str
    ) -> Dict:

        text = transcript.lower()

        return {

            "contains_code":
                any(
                    token in text
                    for token in [
                        "class",
                        "function",
                        "def",
                        "public static"
                    ]
                ),

            "contains_formula":
                (
                    "=" in text
                ),

            "contains_questions":
                (
                    "?"
                    in transcript
                ),

            "contains_examples":
                (
                    "example"
                    in text
                ),

            "contains_algorithm":
                (
                    "algorithm"
                    in text
                )
        }