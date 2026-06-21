from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)


class Config(BaseSettings):

    APP_NAME: str = (
        "Lecture2Notes AI"
    )

    APP_VERSION: str = (
        "1.0.0"
    )

    GEMINI_API_KEY: str = ""
    
    GROQ_API_KEY: str = ""

    DEEPGRAM_API_KEY: str = ""

    SUPABASE_URL: str = ""

    SUPABASE_KEY: str = ""

    model_config = (
        SettingsConfigDict(
            env_file=".env",
            extra="ignore"
        )
    )


config = Config()