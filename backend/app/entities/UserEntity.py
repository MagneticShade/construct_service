from pymongo.collection import Collection
from fastapi import HTTPException
from app.models import User,UserUpdate
from hashlib import sha256


class UserEntity:
    users_collection:Collection

    def __init__(self, collection: Collection) -> None:
        self.users_collection = collection

    def get_by_id(self,id:str)->User:
        user=self.users_collection.find_one({"telegramID":self.encode(id)})
        if user is None:
            raise HTTPException(status_code = 404) 
        return User(**user)

    def add(self,user:User)->None:
        user.telegramID=self.encode(user.telegramID)

        if(self.exist(user.telegramID)):
            raise HTTPException(status_code=400)
        
        self.users_collection.insert_one(user.model_dump())

    def edit(self,id:str,user_u:UserUpdate)->User:
        result=self.users_collection.update_one(
        {"telegramID": self.encode(id)}, {"$set": user_u.model_dump(exclude_none=True)}
    )
        if result.matched_count < 1:
            raise HTTPException(status_code=400)

    def delete(self,id:str)->None:
        if(self.exist(id)):
            self.users_collection.find_one_and_delete({"telegramID":self.encode(id)})
        else:
            raise HTTPException(status_code=404)

    def exist(self, id: str) -> bool:
        shuffled=self.encode(id)
        return self.users_collection.find_one({"telegramID": shuffled}) is not None
    
    def encode(self,string:str) -> str:
        utf=string.encode("utf-8")
        enc=sha256(utf)
        return enc.hexdigest()
