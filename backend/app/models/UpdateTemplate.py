from pydantic import BaseModel
from typing import Optional


class UpdateTemplate(BaseModel):
    name: Optional[str] = None
    background_color: Optional[str] = None
    text_color: Optional[str] = None
    text_align: Optional[str] = None
    scheme: Optional[str] = None
