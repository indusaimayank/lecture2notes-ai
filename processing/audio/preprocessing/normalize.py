from pydub import AudioSegment
from pydub.effects import normalize


class AudioNormalizer:

    def process(
        self,
        input_file: str,
        output_file: str
    ):

        audio = AudioSegment.from_file(
            input_file
        )

        normalized = normalize(
            audio
        )

        normalized.export(
            output_file,
            format="wav"
        )

        return output_file