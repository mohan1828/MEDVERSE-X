import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "MEDVERSE-X AI Healthcare Platform Backend"
    ENVIRONMENT: str = "production"
    PORT: int = 8000
    DEBUG: bool = True

    SECRET_KEY: str = "medverse-x-enterprise-super-secret-jwt-key-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200

    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017/medverse_db")
    DATABASE_NAME: str = "medverse_db"

    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://medverse-x.netlify.app",
        "*"
    ]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
