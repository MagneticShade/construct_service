from fastapi import APIRouter
from app.entities import forms
from app.models import Form,FormUpdate


router=APIRouter(prefix="/form")

@router.get("/{id}")
def get_user(id:str):
    return forms.get_by_id(id)

@router.post("/create/")
def create_user(user:Form):
   forms.add(user)

@router.put("/edit/")
def edit_user(id:str,user:FormUpdate):
    return forms.edit(id,user)

@router.delete("/delete/")
def delete_user(id:str):
    forms.delete(id)