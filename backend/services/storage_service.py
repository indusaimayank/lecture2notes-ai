import json
import os
from pathlib import Path
from supabase import create_client, Client
from backend.core.config import config


class StorageService:

    def __init__(self):
        self.bucket_name = "lecture_data"
        self.supabase: Client | None = None
        if config.SUPABASE_URL and config.SUPABASE_KEY:
            try:
                self.supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
            except Exception as e:
                print(f"Failed to initialize Supabase client: {e}")

    def _get_supabase_path(self, file_path: str) -> str:
        """Converts local project_data path to a Supabase bucket path."""
        path_str = str(Path(file_path).as_posix())
        # Strip out project_data/projects/ if it exists
        if "project_data/projects/" in path_str:
            return path_str.split("project_data/projects/")[-1]
        return path_str

    def save_json(self, file_path: str, data: dict):
        path = Path(file_path)
        path.parent.mkdir(parents=True, exist_ok=True)

        json_str = json.dumps(data, indent=2, ensure_ascii=False)
        
        # Save locally (temporary scratchpad)
        path.write_text(json_str, encoding="utf-8")

        # Save to Supabase
        if self.supabase:
            try:
                supabase_path = self._get_supabase_path(file_path)
                # Overwrite if exists by removing first or using upsert
                self.supabase.storage.from_(self.bucket_name).upload(
                    file=json_str.encode('utf-8'),
                    path=supabase_path,
                    file_options={"content-type": "application/json", "upsert": "true"}
                )
            except Exception as e:
                print(f"Supabase upload error for {file_path}: {e}")

    def load_json(self, file_path: str):
        # Try Supabase first
        if self.supabase:
            try:
                supabase_path = self._get_supabase_path(file_path)
                response = self.supabase.storage.from_(self.bucket_name).download(supabase_path)
                return json.loads(response.decode("utf-8"))
            except Exception as e:
                print(f"Supabase download error, falling back to local: {e}")

        # Fallback to local
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def save_text(self, file_path: str, content: str):
        path = Path(file_path)
        path.parent.mkdir(parents=True, exist_ok=True)

        # Save locally
        path.write_text(content, encoding="utf-8")

        # Save to Supabase
        if self.supabase:
            try:
                supabase_path = self._get_supabase_path(file_path)
                self.supabase.storage.from_(self.bucket_name).upload(
                    file=content.encode('utf-8'),
                    path=supabase_path,
                    file_options={"content-type": "text/plain", "upsert": "true"}
                )
            except Exception as e:
                print(f"Supabase upload error for {file_path}: {e}")

    def load_text(self, file_path: str):
        # Try Supabase first
        if self.supabase:
            try:
                supabase_path = self._get_supabase_path(file_path)
                response = self.supabase.storage.from_(self.bucket_name).download(supabase_path)
                return response.decode("utf-8")
            except Exception as e:
                print(f"Supabase download error, falling back to local: {e}")

        # Fallback to local
        return Path(file_path).read_text(encoding="utf-8")