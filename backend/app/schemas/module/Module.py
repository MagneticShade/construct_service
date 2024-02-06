from pydantic import BaseModel,Field
from uuid import uuid4

class Module(BaseModel):
    id:str|None=Field(default=str(uuid4()))
    o_module_id:str
    props:dict[str,str]