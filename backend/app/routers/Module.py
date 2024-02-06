from fastapi import APIRouter
from app.entities import modules
from app.models import Module,ModuleUpdate

router=APIRouter(prefix="/module")

@router.get("/{id}")
def get_user(id:str):
    return modules.get_by_id(id)

@router.post("/create/")
def create_user(user:Module):
    modules.add(user)

@router.put("/edit/")
def edit_user(id:str,user:ModuleUpdate):
    return modules.edit(id,user)

@router.delete("/delete/")
def delete_user(id:str):
    modules.delete(id)