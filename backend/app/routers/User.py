from fastapi import APIRouter
from app.entities import users
from app.models import User,UserUpdate

router=APIRouter(prefix="/user")

@router.get("/{id}")
def get_user(id:str):
    return users.get_by_id(id)

@router.post("/create/")
def create_user(user:User):
    users.add(user)

@router.put("/edit/")
def edit_user(id:str,user:UserUpdate):
    return users.edit(id,user)

@router.delete("/delete/")
def delete_user(id:str):
    users.delete(id)