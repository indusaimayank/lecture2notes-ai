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

        # Format strings from most preferred to most lenient
        FORMATS = [
            "bestaudio[ext=webm]/bestaudio[ext=m4a]/bestaudio/best[height<=480]/best",
            "bestaudio/best",
            "best",
        ]

        download_configs = []

        # For each player client, try multiple format strings
        for player_client in [["tv"], ["tv", "web"], ["android"], ["ios"], ["mweb"], ["web"]]:
            for fmt in FORMATS:
                cfg = {
                    "format": fmt,
                    "outtmpl": output_template,
                    "noplaylist": True,
                    "quiet": False,
                    "postprocessors": postprocessors,
                    "extractor_args": {
                        "youtube": {
                            "player_client": player_client
                        }
                    },
                }
                if cookies_file:
                    cfg["cookiefile"] = cookies_file
                download_configs.append(cfg)

        # Final fallback: let yt-dlp pick any format with no restrictions
        download_configs.append({
            "format": None,  # let yt-dlp decide
            "outtmpl": output_template,
            "noplaylist": True,
            "quiet": False,
            "postprocessors": postprocessors,
            "js_runtimes": {"node": {}},
            **({"cookiefile": cookies_file} if cookies_file else {}),
        })

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