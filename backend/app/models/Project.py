from . import ProjectID, TelegramID, TemplateID, NewProject


class Project(NewProject):
    ID: ProjectID
    templates: list[TemplateID]
    owner: TelegramID
