from pydub import AudioSegment


class AudioResampler:

    def process(
        self,
        input_file: str,
        output_file: str,
        sample_rate: int = 16000
    ):

        audio = AudioSegment.from_file(
            input_file
        )

        audio = (
            audio.set_frame_rate(
                sample_rate
            )
        )

        audio.export(
            output_file,
            format="wav"
        )

        return output_file