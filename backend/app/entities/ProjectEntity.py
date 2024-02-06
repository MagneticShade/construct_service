from pymongo.collection import Collection
from fastapi import HTTPException
from app.models import Project,ProjectUpdate


class ProjectEntity:
    projects_collection:Collection

    def __init__(self, collection: Collection) -> None:
        self.projects_collection = collection

    def get_by_id(self,id:str)->Project:
        project=self.projects_collection.find_one({"id":id})
        if project is None:
            raise HTTPException(status_code = 404) 
        return Project(**project)
    
    def add(self,project:Project)->str:

        if(self.exist(project.id)):
            raise HTTPException(status_code=400)

        self.projects_collection.insert_one(project.model_dump())
        return project.id
    
    def edit(self,id:str,project_u:ProjectUpdate)->Project:
        result=self.projects_collection.update_one(
        {"id": id}, {"$set": project_u.model_dump(exclude_none=True)}
    )
        
        if result.matched_count < 1:
            raise HTTPException(status_code=400)


    def delete(self,id:str)->None:
        if(self.exist(id)):
            self.projects_collection.find_one_and_delete({"id":id})
        else:
            raise HTTPException(status_code=404)
        
        

    def exist(self,id: str) -> bool:
        return self.projects_collection.find_one({"id": id}) is not None
    
    
