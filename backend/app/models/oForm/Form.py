from pydantic import BaseModel,Field
from uuid import uuid4,UUID

class Form(BaseModel):
    id:str|None=Field(default=str(uuid4()))
    name:str
    module_id:list[str]
    layout_link:str
    props:list[str]

