import shutil


class AudioDenoiser:

    def process(
        self,
        input_file: str,
        output_file: str
    ):

        shutil.copy(
            input_file,
            output_file
        )

        return output_file