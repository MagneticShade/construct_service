from pydantic import BaseModel


class NewTemplate(BaseModel):
    name: str
    background_color: str
    text_color: str
    text_align: str
