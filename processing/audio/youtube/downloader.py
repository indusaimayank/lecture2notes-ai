import os
import tempfile
import base64
from pathlib import Path

import yt_dlp


class YouTubeDownloader:

    def _get_cookies_file(self) -> str | None:
        """Write YOUTUBE_COOKIES env var (base64 cookies.txt) to a temp file."""
        cookies_b64 = os.environ.get("YOUTUBE_COOKIES")
        if not cookies_b64:
            return None
        try:
            cookies_content = base64.b64decode(cookies_b64).decode("utf-8")
            tmp = tempfile.NamedTemporaryFile(
                mode="w", suffix=".txt", delete=False
            )
            tmp.write(cookies_content)
            tmp.close()
            return tmp.name
        except Exception as e:
            print(f"Failed to load YOUTUBE_COOKIES: {e}")
            return None

    def _download_with_options(
        self,
        youtube_url: str,
        ydl_opts: dict
    ):
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])

    def download_audio(
        self,
        youtube_url: str,
        project_path: str
    ) -> str:

        audio_dir = Path(project_path) / "audio"
        audio_dir.mkdir(parents=True, exist_ok=True)

        output_template = str(audio_dir / "original.%(ext)s")

        # Try to get cookies from environment (for server deployments)
        cookies_file = self._get_cookies_file()

        postprocessors = [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ]

        def make_config(player_client: list, extra: dict = {}):
            cfg = {
                "format": "bestaudio/best",
                "outtmpl": output_template,
                "noplaylist": True,
                "quiet": False,
                "postprocessors": postprocessors,
                "extractor_args": {
                    "youtube": {
                        "player_client": player_client
                    }
                },
                **extra,
            }
            if cookies_file:
                cfg["cookiefile"] = cookies_file
            return cfg

        download_configs = [
            # Strategy 1: TV client — least bot-detection, works on servers
            make_config(["tv"]),

            # Strategy 2: TV + web fallback
            make_config(["tv", "web"]),

            # Strategy 3: Android — no JS challenge needed
            make_config(["android"]),

            # Strategy 4: iOS client
            make_config(["ios"]),

            # Strategy 5: MWeb (mobile web) 
            make_config(["mweb"]),

            # Strategy 6: Default (no player_client override) with node JS runtime
            {
                "format": "bestaudio/best",
                "outtmpl": output_template,
                "noplaylist": True,
                "quiet": False,
                "js_runtimes": {"node": {}},
                "postprocessors": postprocessors,
                **({"cookiefile": cookies_file} if cookies_file else {}),
            },
        ]

        last_error = None

        for config in download_configs:
            try:
                self._download_with_options(youtube_url, config)

                mp3_files = list(audio_dir.glob("*.mp3"))

                if mp3_files:
                    return str(mp3_files[0])

            except Exception as e:
                print(f"Download strategy failed: {e}")
                last_error = e

        raise RuntimeError(
            f"All YouTube download strategies failed. Last error: {last_error}"
        )