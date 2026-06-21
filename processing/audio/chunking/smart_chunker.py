from pathlib import Path
import warnings

# Suppress pydub Python 3.12 SyntaxWarnings
warnings.filterwarnings("ignore", category=SyntaxWarning, module="pydub.utils")

from pydub import AudioSegment

from processing.audio.chunking.chunk_metadata import (
    ChunkMetadata
)


class SmartChunker:

    def split_audio(
        self,
        audio_path: str,
        output_dir: str,
        chunk_minutes: int = 5
    ):

        audio = AudioSegment.from_file(
            audio_path
        )

        chunk_length_ms = (
            chunk_minutes
            * 60
            * 1000
        )

        chunks = []

        Path(output_dir).mkdir(
            parents=True,
            exist_ok=True
        )

        for index, start in enumerate(
            range(
                0,
                len(audio),
                chunk_length_ms
            )
        ):

            end = min(
                start + chunk_length_ms,
                len(audio)
            )

            chunk = audio[start:end]

            chunk_file = (
                Path(output_dir)
                / f"chunk_{index}.wav"
            )

            chunk.export(
                chunk_file,
                format="wav"
            )

            chunks.append(

                ChunkMetadata(

                    chunk_id=index,

                    file_path=str(
                        chunk_file
                    ),

                    start_time=start
                    / 1000,

                    end_time=end
                    / 1000,

                    duration=(
                        end - start
                    )
                    / 1000
                )
            )

        return chunks