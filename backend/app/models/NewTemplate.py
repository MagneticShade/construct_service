from pydantic import BaseModel
from app.models import TemplateBackgroundType, ProcedureBackground


class NewTemplate(BaseModel):
    name: str
    background_color: str
    text_color: str
    text_align: str
    scheme: str
    background_type: TemplateBackgroundType
    procedure_background: ProcedureBackground = ProcedureBackground.default()
