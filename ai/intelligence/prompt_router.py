class PromptRouter:

    SUBJECT_PROMPTS = {

        "Programming":
            "programming",

        "Mathematics":
            "mathematics",

        "Physics":
            "physics",

        "English":
            "english",

        "Aptitude":
            "aptitude",

        "Reasoning":
            "reasoning",

        "GATE":
            "gate",

        "Interview Preparation":
            "interview"
    }

    def route(
        self,
        profile: dict
    ):

        subject = profile.get(
            "subject",
            ""
        )

        return (
            self.SUBJECT_PROMPTS.get(
                subject,
                "general"
            )
        )