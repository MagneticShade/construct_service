from pydantic import BaseModel
from typing import Optional
from app.models import TemplateBackgroundType, UpdateProcedureBackground


class UpdateTemplate(BaseModel):
    name: Optional[str] = None
    background_color: Optional[str] = None
    text_color: Optional[str] = None
    text_align: Optional[str] = None
    scheme: Optional[str] = None
    background_type: Optional[TemplateBackgroundType] = None
    procedure_background: Optional[UpdateProcedureBackground] = None
