from pathlib import Path
import json

from processing.stt.deepgram.transcriber import (
    DeepgramTranscriber
)

from processing.transcript.cleaner import (
    TranscriptCleaner
)

from processing.transcript.paragraph_builder import (
    ParagraphBuilder
)

from processing.transcript.transcript_analyzer import (
    TranscriptAnalyzer
)


class TranscriptPipeline:

    def __init__(self):

        self.transcriber = (
            DeepgramTranscriber()
        )

        self.cleaner = (
            TranscriptCleaner()
        )

        self.paragraph_builder = (
            ParagraphBuilder()
        )

        self.analyzer = (
            TranscriptAnalyzer()
        )

    def process(
        self,
        audio_path: str,
        project_path: str
    ):
    
        from processing.audio.chunking.smart_chunker import SmartChunker
        
        # 1. Chunk audio into 2-minute segments
        chunker = SmartChunker()
        chunk_dir = str(Path(project_path) / "chunks")
        chunks = chunker.split_audio(
            audio_path=audio_path,
            output_dir=chunk_dir,
            chunk_minutes=2
        )
        
        print(f"Divided audio into {len(chunks)} chunks of 2 minutes each.")

        # 2. Transcribe each chunk
        combined_text = ""
        for chunk in chunks:
            print(f"Transcribing chunk {chunk.chunk_id}...")
            transcript_chunk = self.transcriber.transcribe(chunk.file_path)
            chunk_text = transcript_chunk.get("text", "")
            if chunk_text:
                combined_text += chunk_text + " "

        cleaned_text = (
            self.cleaner.clean(
                combined_text.strip()
            )
        )

        paragraphs = (
            self.paragraph_builder.build(
                cleaned_text
            )
        )

        analysis = (
            self.analyzer.analyze(
                cleaned_text
            )
        )

        transcript_json = {

            "text":
                cleaned_text,

            "paragraphs":
                paragraphs,

            "analysis":
                analysis
        }

        transcript_dir = (
            Path(project_path)
            / "transcripts"
        )

        transcript_dir.mkdir(
            parents=True,
            exist_ok=True
        )

        transcript_file = (
            transcript_dir
            / "transcript.json"
        )

        with open(
            transcript_file,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                transcript_json,
                f,
                indent=4,
                ensure_ascii=False
            )

        return transcript_json