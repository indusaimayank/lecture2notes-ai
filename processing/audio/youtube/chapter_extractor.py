import yt_dlp


class ChapterExtractor:

    def extract(
        self,
        youtube_url: str
    ):

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

        chapters = (
            info.get(
                "chapters",
                []
            )
        )

        return [

            {

                "title":
                    chapter.get(
                        "title"
                    ),

                "start_time":
                    chapter.get(
                        "start_time"
                    ),

                "end_time":
                    chapter.get(
                        "end_time"
                    )
            }

            for chapter in chapters
        ]