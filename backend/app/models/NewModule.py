from pydantic import BaseModel


class NewModule(BaseModel):
    background_color: str
    header_text: str
    subheader_text: str
    text_align: str
    text_color: str
