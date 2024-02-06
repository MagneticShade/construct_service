from pydantic import BaseModel,Field


class UserUpdate(BaseModel):
    phone_number:str|None=Field(default=None)
    birthday: str|None=Field(default=None)
    first_name: str|None=Field(default=None)
    last_name: str|None=Field(default=None)
    status: str|None=Field(default=None)
    bio: str|None=Field(default=None)
    projects: list[str]|None=Field(default=None)