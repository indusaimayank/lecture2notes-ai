from dataclasses import dataclass


@dataclass
class ChunkMetadata:

    chunk_id: int

    file_path: str

    start_time: float

    end_time: float

    duration: float