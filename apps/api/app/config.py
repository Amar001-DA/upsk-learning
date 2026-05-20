from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    port: int
    database_url: str

    @field_validator("port")
    @classmethod
    def validate_port(cls, value):
        if value <= 0 or value > 65535:
            raise ValueError("PORT must be between 1 and 65535")
        return value


settings = Settings()
