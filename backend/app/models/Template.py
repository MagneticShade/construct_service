from . import ModuleID, ProjectID, TemplateID, NewTemplate


class Template(NewTemplate):
    ID: TemplateID
    modules: list[ModuleID]
    project: ProjectID
