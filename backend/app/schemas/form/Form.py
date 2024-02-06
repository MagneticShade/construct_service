from pydantic import BaseModel,Field
from ..module import Module
from uuid import uuid4

class Form(BaseModel):
    id:str|None=Field(default=str(uuid4()))
    o_form_id:str
    module_list:list[Module]
    props:dict[str,str]