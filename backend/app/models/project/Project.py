from pydantic import BaseModel,Field
from app.schemas import Form
from uuid import uuid4

class Project(BaseModel):
    id:str|None=Field(default=str(uuid4()))
    title:str
    url:str
    style_template:str
    description:str
    icon_link:str
    form_list:list[Form]|None
    
