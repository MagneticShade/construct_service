from fastapi import APIRouter
from app.entities import forms
from app.models import Form,FormUpdate
from uuid import UUID


router=APIRouter(prefix="/form")

router=APIRouter(prefix="/module")

@router.get("/{id}")
def get_user(id:UUID):
    return forms.get_by_id(id)

@router.post("/create/")
def create_user(user:Form):
   forms.add(user)

@router.put("/edit/")
def edit_user(id:UUID,user:FormUpdate):
    return forms.edit(id,user)

@router.delete("/delete/")
def delete_user(id:UUID):
    forms.delete(id)