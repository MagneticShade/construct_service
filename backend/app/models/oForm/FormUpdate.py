from pydantic import BaseModel,Field


class FormUpdate(BaseModel):
    name:str|None=Field(default=None)
    module_id:list[str]|None=Field(default=None)
    layout_link:str|None=Field(default=None)
    props:list[str]|None=Field(default=None)