from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ContactMessageCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=80, alias="firstName")
    last_name: str = Field(..., min_length=1, max_length=80, alias="lastName")
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=30)
    company: Optional[str] = Field(None, max_length=120)
    position: Optional[str] = Field(None, max_length=120)
    message: str = Field(..., min_length=1, max_length=4000)
    turnstile_token: Optional[str] = Field(None, alias="turnstileToken")

    class Config:
        populate_by_name = True

class ContactResponse(BaseModel):
    success: bool
    message: str
