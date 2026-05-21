from pydantic import BaseModel, HttpUrl, field_validator
from urllib.parse import urlparse


class CreateLinkRequest(BaseModel):
    long_url: HttpUrl


    @field_validator("long_url")
    @classmethod
    def validate_url_scheme(cls, value):
        parsed = urlparse(str(value))

        allowed_schemes = ["http", "https"]

        if parsed.scheme not in allowed_schemes:
            raise ValueError("Only http and https URLs are allowed")

        return value


class LinkResponse(BaseModel):
    id: int
    code: str
    long_url: str

    class Config:
        from_attributes = True
