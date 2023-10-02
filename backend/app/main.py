from typing import Optional
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from pymongo import MongoClient
from pydantic import BaseModel
import uuid
import os

app = FastAPI()

mongoClient = MongoClient(host="mongo_backend", port=27017)
database = mongoClient.get_database("backend")
users_collection = database.get_collection("users")
projects_collection = database.get_collection("projects")
templates_collection = database.get_collection("templates")
modules_collection = database.get_collection("modules")


TelegramID = str
ProjectID = str
TemplateID = str
ModuleID = str


class User(BaseModel):
    telegramID: TelegramID
    projects: list[ProjectID]


class NewProject(BaseModel):
    title: str
    slogan: str
    description: str
    tags: list[str]


class Project(NewProject):
    ID: ProjectID
    templates: list[TemplateID]


class UpdateProject(BaseModel):
    title: Optional[str] = None
    slogan: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[list[str]] = None


class NewTemplate(BaseModel):
    name: str
    background_color: str
    text_color: str
    text_align: str


class Template(NewTemplate):
    ID: TemplateID
    modules: list[ModuleID]


class UpdateTemplate(BaseModel):
    name: Optional[str] = None
    background_color: Optional[str] = None
    text_color: Optional[str] = None
    text_align: Optional[str] = None


class NewModule(BaseModel):
    background_color: str
    header_text: str
    subheader_text: str
    text_align: str
    text_color: str


class Module(NewModule):
    ID: ModuleID


class UpdateModule(BaseModel):
    background_color: Optional[str] = None
    header_text: Optional[str] = None
    subheader_text: Optional[str] = None
    text_align: Optional[str] = None
    text_color: Optional[str] = None


@app.get(
    "/user/{telegramID}",
    tags=["User"],
    description="Return user by its telegramID. If user not exist raises 400 error",
)
async def get_user(telegramID: TelegramID) -> User:
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    return User(**user)


@app.post(
    "/user/{telegramID}",
    tags=["User"],
    description="Creates new user by telegramID. If user exists return 400 error",
)
async def post_user(telegramID: TelegramID) -> None:
    if users_collection.find_one({"telegramID": telegramID}) is not None:
        raise HTTPException(status_code=400, detail="User exist")
    user = User(telegramID=telegramID, projects=[])
    users_collection.insert_one(user.model_dump())


@app.post(
    "/user/{telegramID}/project",
    tags=["User", "Project"],
    description="Creates new project for user by telegramID. If user not exist raise 400 error.",
)
async def post_user_project(telegramID: TelegramID, project: NewProject) -> ProjectID:
    user = User(**users_collection.find_one_and_delete({"telegramID": telegramID}))
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    projectID = str(uuid.uuid4())
    project = Project(**project.model_dump(), ID=projectID, templates=[])
    user.projects.append(projectID)
    users_collection.insert_one(user.model_dump())
    projects_collection.insert_one(project.model_dump())
    return projectID


@app.get(
    "/project/{projectID}",
    tags=["Project"],
    description="Get project by id. If project not exist raises 400 error",
)
async def get_project(projectID: ProjectID) -> Project:
    project = projects_collection.find_one({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    return project


@app.patch(
    "/project/{projectID}",
    tags=["Project"],
    description="Updates project properties with only provided fields. If field is not provided its value not updates. If project not exist raises 400 error",
)
async def patch_project(projectID: ProjectID, updates: UpdateProject) -> None:
    project = projects_collection.find_one_and_delete({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    project = Project(**{**project, **updates.model_dump(exclude_none=True)})
    projects_collection.insert_one(project.model_dump())


@app.delete(
    "/project/{projectID}",
    tags=["Project"],
    description="Deletes project by id and all contained templates and modules. If project not exist raises 400 error",
)
async def delete_project(projectID: ProjectID) -> None:
    project = projects_collection.find_one_and_delete({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    project = Project(**project)
    for templateID in project.templates:
        template = templates_collection.find_one_and_delete({"ID": templateID})
        template = Template(**template)
        for moduleID in template.modules:
            modules_collection.delete_one({"ID": moduleID})


@app.post(
    "/project/{projectID}/logo",
    tags=["Project"],
    description="Replace old logo with new if exist",
)
async def post_project_logo(projectID: ProjectID, file: UploadFile = File()) -> None:
    project = projects_collection.find_one({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    file.filename = f"{projectID}"
    contents = await file.read()
    with open(f"app/logos/{file.filename}", "wb") as f:
        f.write(contents)


@app.get(
    "/project/{projectID}/logo",
    tags=["Project"],
    description="Return logo for project. If project not exist raises 400 error. If logo not exist raises 404 error",
)
async def get_project_logo(projectID: ProjectID) -> FileResponse:
    if projects_collection.find_one({"ID": projectID}) is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    path = f"app/logos/{projectID}"
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Logo not exist")
    return FileResponse(path, media_type="image/png")


@app.post(
    "/project/{projectID}/template",
    tags=["Project", "Template"],
    description="Creates new template for project. If project not exist raises 400 error",
)
async def post_project_template(
    projectID: ProjectID, template: NewTemplate
) -> TemplateID:
    project = projects_collection.find_one_and_delete({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    project = Project(**project)
    templateID = str(uuid.uuid4())
    template = Template(**template.model_dump(), ID=templateID, modules=[])
    project.templates.append(templateID)
    projects_collection.insert_one(project.model_dump())
    templates_collection.insert_one(template.model_dump())
    return templateID


@app.get(
    "/template/{templateID}",
    tags=["Template"],
    description="Get template by id. If template not exist raises 400 error",
)
async def get_template(templateID: TemplateID) -> Template:
    template = templates_collection.find_one({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    return template


@app.patch(
    "/template/{templateID}",
    tags=["Template"],
    description="Updates template properties with only provided fields. If field is not provided its value not updates. If template not exist raises 400 error",
)
async def patch_template(templateID: TemplateID, updates: UpdateTemplate) -> None:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**{**template, **updates.model_dump(exclude_none=True)})
    templates_collection.insert_one(template.model_dump())


@app.delete(
    "/template/{templateID}",
    tags=["Template"],
    description="Deletes template by id and all contained modules. If template not exist raises 400 error",
)
async def delete_template(templateID: TemplateID) -> None:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**template)
    for moduleID in template.modules:
        modules_collection.delete_one({"ID": moduleID})


@app.post(
    "/template/{templateID}/module",
    tags=["Template", "Module"],
    description="Creates new module in template. If template not exist raises 400 error",
)
async def post_template_module(templateID: TemplateID, module: NewModule) -> ModuleID:
    template = templates_collection.find_one_and_delete({"ID": templateID})
    if template is None:
        raise HTTPException(status_code=400, detail="Template not exist")
    template = Template(**template.model_dump())
    moduleID = str(uuid.uuid4())
    module = Module(**module.model_dump(), ID=moduleID)
    template.modules.append(moduleID)
    templates_collection.insert_one(template.model_dump())
    modules_collection.insert_one(module.model_dump())
    return moduleID


@app.get(
    "/module/{moduleID}",
    tags=["Module"],
    description="Get module by id. If module not exist raises 400 error",
)
async def get_module(moduleID: ModuleID) -> Module:
    module = modules_collection.find_one({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    return module


@app.patch(
    "/module/{moduleID}",
    tags=["Module"],
    description="Updates module properties with only provided fields. If field is not provided its value not updates. If module not exist raises 400 error",
)
async def patch_module(moduleID: ModuleID, updates: UpdateModule) -> None:
    module = modules_collection.find_one_and_delete({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    module = module(**{**module, **updates.model_dump(exclude_none=True)})
    modules_collection.insert_one(module.model_dump())


@app.delete(
    "/module/{moduleID}",
    tags=["Module"],
    description="Deletes module by id. If module not exist raises 400 error",
)
async def delete_module(moduleID: ModuleID) -> None:
    module = modules_collection.find_one_and_delete({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
