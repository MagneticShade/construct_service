from fastapi import APIRouter
from app.entities import projects,users
from app.models import Project,ProjectUpdate

router=APIRouter(prefix="/project")

@router.get("/{id}",response_model=Project)
def get_project(id:str):
    return projects.get_by_id(id)

@router.post("/create/")
def create_project(project:Project):
    projects.add(project)

@router.put("/{id}/edit/")
def edit_project(id:str,project:ProjectUpdate):
    return projects.edit(id,project)

@router.delete("/{id}/delete/")
def delete_project(id:str,user_id:str):
    users.remove_project(user_id,id)
    projects.delete(id)
    


   