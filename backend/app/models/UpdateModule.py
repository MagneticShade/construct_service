from pydantic import BaseModel
from typing import Optional


class UpdateModule(BaseModel):
    background_color: Optional[str] = None
    header_text: Optional[str] = None
    subheader_text: Optional[str] = None
    text_align: Optional[str] = None
    text_color: Optional[str] = None
