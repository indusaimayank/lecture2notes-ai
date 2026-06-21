from pathlib import Path

import yt_dlp


class YouTubeDownloader:

    def _download_with_options(
        self,
        youtube_url: str,
        ydl_opts: dict
    ):

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            ydl.download(
                [youtube_url]
            )

    def download_audio(
        self,
        youtube_url: str,
        project_path: str
    ) -> str:

        audio_dir = (
            Path(project_path)
            / "audio"
        )

        audio_dir.mkdir(
            parents=True,
            exist_ok=True
        )

        output_template = str(
            audio_dir
            / "original.%(ext)s"
        )

        download_configs = [

            {
                "format": "bestaudio/best",
                "outtmpl": output_template,
                "noplaylist": True,
                "quiet": False,
                "js_runtimes": {"node": {}},
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192",
                    }
                ]
            },

            {
                "format": "bestaudio",
                "outtmpl": output_template,
                "noplaylist": True,
                "quiet": False,
                "js_runtimes": {"node": {}},
                "extractor_args": {
                    "youtube": {
                        "player_client": [
                            "web"
                        ]
                    }
                },
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192",
                    }
                ]
            },

            {
                "format": "bestaudio",
                "outtmpl": output_template,
                "noplaylist": True,
                "quiet": False,
                "js_runtimes": {"node": {}},
                "extractor_args": {
                    "youtube": {
                        "player_client": [
                            "ios"
                        ]
                    }
                },
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192",
                    }
                ]
            }
        ]

        last_error = None

        for config in download_configs:

            try:

                self._download_with_options(
                    youtube_url,
                    config
                )

                mp3_files = list(
                    audio_dir.glob("*.mp3")
                )

                if mp3_files:

                    return str(
                        mp3_files[0]
                    )

            except Exception as e:

                print(
                    f"Download strategy failed: {e}"
                )

                last_error = e

        raise RuntimeError(
            f"All YouTube download strategies failed. "
            f"Last error: {last_error}"
        )