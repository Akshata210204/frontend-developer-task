from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional

from backend.database import get_db
from backend.models import User
from backend.schemas import UserResponse
from backend.utils.jwt_utils import verify_token
from backend.utils.security import hash_password

router = APIRouter(tags=["Profile"])


# ✅ Get profile
@router.get("/me", response_model=UserResponse)
def get_profile(
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == payload["sub"]).first()
    return user


# ✅ Update profile (name + password)
@router.put("/")
def update_profile(
    name: Optional[str] = None,
    password: Optional[str] = None,
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == payload["sub"]).first()

    if name:
        user.username = name

    if password:
        user.hashed_password = hash_password(password)

    db.commit()
    return {"message": "Profile updated successfully"}
