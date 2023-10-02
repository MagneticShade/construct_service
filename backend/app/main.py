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


TelegramID = str
ProjectID = str


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


@app.put("/user/{telegramID}", tags=["User"], description="Not implemented yet")
async def put_user(telegramID: TelegramID):
    raise NotImplementedError


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
    project = Project(**project.model_dump(), ID=projectID)
    user.projects.append(projectID)
    users_collection.insert_one(user.model_dump())
    projects_collection.insert_one(project.model_dump())
    return projectID


@app.get("/project/{projectID}", tags=["Project"], description="")
async def get_project(projectID: ProjectID) -> Project:
    project = projects_collection.find_one({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    return project


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
