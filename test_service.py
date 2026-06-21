import asyncio
from backend.services.youtube_service import YouTubeService

service = YouTubeService()
try:
    # Use a short youtube video to test
    # This might fail on gemini but we want to see if the fallback works!
    res = service.process_youtube("https://www.youtube.com/watch?v=jNQXAC9IVRw", speed=1.0)
    print("SUCCESS", res["project_id"])
except Exception as e:
    print("FAILED", e)
