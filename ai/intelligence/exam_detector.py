from typing import Dict


class ExamDetector:

    EXAMS = {

        "gate": "GATE",

        "jee": "JEE",

        "neet": "NEET",

        "upsc": "UPSC",

        "placement": "PLACEMENT",

        "interview": "INTERVIEW"
    }

    def detect(
        self,
        transcript: str
    ) -> Dict:

        text = transcript.lower()

        exams = []

        for keyword, name in (
            self.EXAMS.items()
        ):

            if keyword in text:
                exams.append(name)

        return {
            "exam_types": exams
        }