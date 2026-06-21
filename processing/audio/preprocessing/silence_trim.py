from pydub import AudioSegment
from pydub.silence import (
    detect_nonsilent
)


class SilenceTrimmer:

    def process(
        self,
        input_file: str,
        output_file: str
    ):

        audio = AudioSegment.from_file(
            input_file
        )

        nonsilent = detect_nonsilent(
            audio,
            min_silence_len=500,
            silence_thresh=-40
        )

        if not nonsilent:

            audio.export(
                output_file,
                format="wav"
            )

            return output_file

        start = nonsilent[0][0]

        end = nonsilent[-1][1]

        trimmed = audio[
            start:end
        ]

        trimmed.export(
            output_file,
            format="wav"
        )

        return output_file