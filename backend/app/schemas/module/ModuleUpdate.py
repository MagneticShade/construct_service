from pydantic import BaseModel,Field

class ModuleUpdate(BaseModel):
    props:dict[str,str]=Field(default=dict[str,str]())