import yt_dlp
import sys

ydl_opts = {
    "format": "bestaudio",
    "noplaylist": True,
    "quiet": False,
    "js_runtimes": {"node": {}}
}

try:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(["https://www.youtube.com/watch?v=AZH2iev6POI"])
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
