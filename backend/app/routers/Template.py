import uuid
from fastapi import APIRouter, HTTPException
from app.models import (
    TemplateID,
    ModuleID,
    Template,
    UpdateTemplate,
    Project,
    NewModule,
    Module,
)
from app.database import templates_collection, projects_collection, modules_collection


router = APIRouter(prefix="/template")


@router.get(
    "/{templateID}",
    tags=["Template"],
    description="Get template by id. If template not exist raises 400 error",
)
async def get_template(templateID: TemplateID) -> Template:
    template = templates_collection.find_one({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    return template


@router.patch(
    "/{templateID}",
    tags=["Template"],
    description="Updates template properties with only provided fields. If field is not provided its value not updates. If template not exist raises 400 error",
)
async def patch_template(templateID: TemplateID, updates: UpdateTemplate) -> None:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**{**template, **updates.model_dump(exclude_none=True)})
    templates_collection.insert_one(template.model_dump())


@router.delete(
    "/{templateID}",
    tags=["Template"],
    description="Deletes template by id and all contained modules. If template not exist raises 400 error",
)
async def delete_template(templateID: TemplateID) -> None:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**template)
    project = projects_collection.find_one_and_delete({"ID": template.project})
    if project is not None:
        project = Project(**project)
        project.templates.remove(template.ID)
        projects_collection.insert_one(project.model_dump())
    for moduleID in template.modules:
        modules_collection.delete_one({"ID": moduleID})


@router.post(
    "/{templateID}/module",
    tags=["Template", "Module"],
    description="Creates new module in template. If template not exist raises 400 error",
)
async def post_template_module(templateID: TemplateID, module: NewModule) -> ModuleID:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**template.model_dump())
    moduleID = str(uuid.uuid4())
    module = Module(**module.model_dump(), ID=moduleID, template=templateID)
    template.modules.append(moduleID)
    templates_collection.insert_one(template.model_dump())
    modules_collection.insert_one(module.model_dump())
    return moduleID
