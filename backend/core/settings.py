class Settings:

    TRANSCRIPT_MODEL = (
        "nova-3"
    )

    NOTES_MODEL = (
        "gemini-2.5-pro"
    )

    CLASSIFIER_MODEL = (
        "gemini-2.5-flash"
    )

    MAX_CONCURRENT_JOBS = 5

    MAX_TRANSCRIPT_TOKENS = (
        1000000
    )


settings = Settings()