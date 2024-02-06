from pydantic import BaseModel,Field
from uuid import uuid4,UUID


class Module(BaseModel):
    id:str|None=Field(default=str(uuid4()))
    name:str
    size:str
    props:list[str]
    content_link:str

