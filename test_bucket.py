import sys
from supabase import create_client
from backend.core.config import config

try:
    supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
    
    # Try to get bucket
    try:
        bucket = supabase.storage.get_bucket("lecture_data")
        print("Bucket 'lecture_data' already exists.")
    except Exception as e:
        print("Bucket does not exist, attempting to create...")
        res = supabase.storage.create_bucket("lecture_data", options={"public": True})
        print(f"Bucket created: {res}")
        
    print("SUCCESS")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
