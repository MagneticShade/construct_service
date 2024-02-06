from fastapi import APIRouter
from app.entities import users,projects
from app.models import User,UserUpdate,Project

router=APIRouter(prefix="/user")

@router.get("/{id}",response_model=User)
def get_user(id:str)->User:
    return users.get_by_id(id)

@router.post("/create/")
def create_user(user:User)->None:
    users.add(user)

@router.put("/{id}/edit/")
def edit_user(id:str,user:UserUpdate):
    return users.edit(id,user)

@router.delete("/{id}/delete/")
def delete_user(id:str):
    users.delete(id)

@router.post("/{id}/create/project")
def user_add_project(id:str,project:Project)->str:
    users.add_project(id,project.id)
    projects.add(project)
    return project.id


    