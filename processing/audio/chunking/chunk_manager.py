from processing.chunking.smart_chunker import (
    SmartChunker
)


class ChunkManager:

    def __init__(self):

        self.chunker = (
            SmartChunker()
        )

    def create_chunks(
        self,
        audio_path: str,
        project_path: str
    ):

        chunk_dir = (
            f"{project_path}/chunks"
        )

        return self.chunker.split_audio(
            audio_path,
            chunk_dir
        )