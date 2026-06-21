from pathlib import Path

from pydub import AudioSegment


class AudioConverter:

    def convert_to_wav(
        self,
        input_file: str,
        output_file: str
    ) -> str:

        audio = AudioSegment.from_file(
            input_file
        )

        Path(
            output_file
        ).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        audio.export(
            output_file,
            format="wav"
        )

        return output_file