from supabase import create_client

SUPABASE_URL="https://lncalzgqrmgsxdremtxg.supabase.co"

SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuY2Fsemdxcm1nc3hkcmVtdHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA1OTU2MSwiZXhwIjoyMDk3NjM1NTYxfQ.eJGr-lWka1ucSZIAWvzxBvn7TSAsFezGga-8dcdsM2w"

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)
print("Supabase client created successfully.")