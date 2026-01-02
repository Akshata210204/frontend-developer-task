from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Task, User
from backend.schemas import TaskCreate
from backend.utils.jwt_utils import verify_token

router = APIRouter(tags=["Tasks"])


# 🔹 Helper: get logged-in user
def get_current_user(payload, db: Session):
    return db.query(User).filter(User.email == payload["sub"]).first()


# 🔹 CREATE TASK
@router.post("/")
def create_task(
    task: TaskCreate,
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = get_current_user(payload, db)

    new_task = Task(
        title=task.title,
        description=task.description,
        completed=False,          # ✅ IMPORTANT
        user_id=user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


# 🔹 GET ALL TASKS (FOR LOGGED-IN USER)
@router.get("/")
def get_tasks(
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = get_current_user(payload, db)
    return db.query(Task).filter(Task.user_id == user.id).all()


# 🔹 UPDATE TASK (TITLE / DESCRIPTION / COMPLETED)
@router.put("/{task_id}")
def update_task(
    task_id: int,
    title: str,
    description: str = "",
    completed: bool = False,     # ✅ IMPORTANT
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = get_current_user(payload, db)

    db_task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == user.id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = title
    db_task.description = description
    db_task.completed = completed   # ✅ THIS FIXES CHECKBOX

    db.commit()
    db.refresh(db_task)
    return db_task                  # ✅ return updated task


# 🔹 DELETE TASK
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    payload=Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = get_current_user(payload, db)

    db_task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == user.id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
