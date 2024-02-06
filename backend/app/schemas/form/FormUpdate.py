from pydantic import BaseModel,Field
from ..module import Module

class FormUpdate(BaseModel):
    module_list:list[Module]|None=Field(default=None)
    props:dict[str,str]=Field(default=dict[str,str]())