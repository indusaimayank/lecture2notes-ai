class SpeakerMapper:

    def map(
        self,
        utterances: list
    ):

        speakers = {}

        for utterance in utterances:

            speaker = utterance.get(
                "speaker",
                "Unknown"
            )

            speakers.setdefault(
                speaker,
                []
            ).append(
                utterance
            )

        return speakers