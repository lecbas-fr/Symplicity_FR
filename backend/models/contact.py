from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    turnstile_token: Optional[str] = Field(None, alias="turnstileToken")

    class Config:
        populate_by_name = True

class ContactResponse(BaseModel):
    success: bool
    message: str