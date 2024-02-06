from pydantic import BaseModel

class User(BaseModel):
    telegramID: str
    phone_number: str
    birthday: str
    first_name: str
    last_name: str
    status: str
    bio: str
    projects: list[str]|None