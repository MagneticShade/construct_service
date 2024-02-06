from fastapi import APIRouter
from app.entities import modules
from app.models import Module,ModuleUpdate
from uuid import UUID

router=APIRouter(prefix="/module")

@router.get("/{id}")
def get_user(id:UUID):
    return modules.get_by_id(id)

@router.post("/create/")
def create_user(user:Module):
    modules.add(user)

@router.put("/edit/")
def edit_user(id:UUID,user:ModuleUpdate):
    return modules.edit(id,user)

@router.delete("/delete/")
def delete_user(id:UUID):
    modules.delete(id)