from typing import Dict


class TeachingStyleDetector:

    def detect(
        self,
        transcript: str
    ) -> Dict:

        text = transcript.lower()

        style = []

        if "example" in text:
            style.append("Example Driven")

        if "question" in text:
            style.append("Interactive")

        if "proof" in text:
            style.append("Theoretical")

        if (
            "code" in text
            or
            "program" in text
        ):
            style.append("Practical")

        if not style:
            style.append("Lecture")

        return {
            "teaching_style": style
        }