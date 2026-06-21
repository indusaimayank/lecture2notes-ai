class TranscriptAnalyzer:

    def analyze(
        self,
        transcript: str
    ):

        return {

            "word_count":
                len(
                    transcript.split()
                ),

            "character_count":
                len(transcript)
        }