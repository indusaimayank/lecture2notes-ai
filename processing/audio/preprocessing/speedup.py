from pydub import AudioSegment
from pydub.effects import (
    speedup
)


class AudioSpeedup:

    def process(
        self,
        input_file: str,
        output_file: str,
        playback_speed: float = 1.5
    ):

        audio = AudioSegment.from_file(
            input_file
        )

        faster = speedup(
            audio,
            playback_speed=
            playback_speed
        )

        faster.export(
            output_file,
            format="wav"
        )

        return output_file