from pydantic import BaseModel,Field


class ModuleUpdate(BaseModel):
    name:str|None=Field(default=None)
    size:str|None=Field(default=None)
    props:list[str]|None=Field(default=None)
    content_link:str|None=Field(default=None)
