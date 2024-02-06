from fastapi import APIRouter
from app.entities import projects
from app.models import Project,ProjectUpdate
from uuid import UUID

router=APIRouter(prefix="/project")

@router.get("/{id}")
def get_user(id:UUID):
    return projects.get_by_id(id)

@router.post("/create/")
def create_user(user:Project):
    projects.add(user)

@router.put("/edit/")
def edit_user(id:UUID,user:ProjectUpdate):
    return projects.edit(id,user)

@router.delete("/delete/")
def delete_user(id:UUID):
    projects.delete(id)