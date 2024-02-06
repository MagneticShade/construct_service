from pymongo.collection import Collection
from fastapi import HTTPException
from app.models import Form,FormUpdate


class FormEntity:
    forms_collection:Collection

    def __init__(self, collection: Collection) -> None:
        self.forms_collection=collection
        
    def get_by_id(self,id:str)->Form:

        form=self.forms_collection.find_one({"id":id})
        if form is None:
            raise HTTPException(status_code = 404) 
        return Form(**form)
    
    def add(self,form:Form)->str:
        if(self.exist(form.id)):
            raise HTTPException(status_code=400)

        self.forms_collection.insert_one(form.model_dump())
        return form.id
    
    def edit(self,id:str,form_u:FormUpdate)->Form:
        result=self.forms_collection.update_one(
        {"id": id}, {"$set": form_u.model_dump(exclude_none=True)}
    )
        
        if result.matched_count < 1:
            raise HTTPException(status_code=400)

    def delete(self,id:str)->None:
        if(self.exist(id)):
            self.forms_collection.find_one_and_delete({"id":id})
        else:
            raise HTTPException(status_code=404)
        

    def exist(self, id: str) -> bool:
        return self.forms_collection.find_one({"id": id}) is not None
    
    
