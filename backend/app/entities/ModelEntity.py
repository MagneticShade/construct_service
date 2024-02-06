from pymongo.collection import Collection
from fastapi import HTTPException
from app.models import Module,ModuleUpdate

class ModuleEntity:
    modules_collection:Collection

    def __init__(self, collection: Collection) -> None:
        self.modules_collection=collection

    def get_by_id(self,id:str)->Module:

        module=self.modules_collection.find_one({"id":id})
        if module is None:
            raise HTTPException(status_code = 404) 
        return Module(**module)
    
    def add(self,module:Module)->str:
        if(self.exist(module.id)):
            raise HTTPException(status_code=400)

        self.modules_collection.insert_one(module.model_dump())
        return module.id

    def edit(self,id:str,module_u:ModuleUpdate)->Module:
        result=self.modules_collection.update_one(
        {"id": id}, {"$set": module_u.model_dump(exclude_none=True)}
    )
        
        if result.matched_count < 1:
            raise HTTPException(status_code=400)


    def delete(self,id:str)->None:
        if(self.exist(id)):
            self.modules_collection.find_one_and_delete({"id":id})
        else:
            raise HTTPException(status_code=404)
        

    def exist(self, id: str) -> bool:
        return self.modules_collection.find_one({"id": id}) is not None
    
    
