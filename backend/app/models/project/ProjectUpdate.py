from pydantic import BaseModel,Field
from app.schemas import Form

class ProjectUpdate(BaseModel):
    title:str|None=Field(default=None)
    url:str|None=Field(default=None)
    style_template:str|None=Field(default=None)
    description:str|None=Field(default=None)
    icon_link:str|None=Field(default=None)
    form_list:list[Form]|None=Field(default=None) 
    
