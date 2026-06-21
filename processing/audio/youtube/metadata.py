import yt_dlp


class YouTubeMetadata:

    def get_metadata(
        self,
        youtube_url: str
    ) -> dict:

        ydl_opts = {
            "quiet": True,
            "skip_download": True
        }

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            info = ydl.extract_info(
                youtube_url,
                download=False
            )

        return {

            "id":
                info.get("id"),

            "title":
                info.get("title"),

            "uploader":
                info.get("uploader"),

            "duration":
                info.get("duration"),

            "description":
                info.get(
                    "description",
                    ""
                ),

            "upload_date":
                info.get(
                    "upload_date"
                )
        }