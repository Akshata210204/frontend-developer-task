from pydantic import BaseModel, EmailStr
from typing import Optional

# --- User Schemas ---
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username:Optional[str]
    email: EmailStr

    class Config:
        from_attributes = True

# --- Task Schemas ---
class TaskCreate(BaseModel):
    title: str
    description: str

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    completed: bool

    class Config:
        from_attributes = True
