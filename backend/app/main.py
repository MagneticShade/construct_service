from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
import uuid

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
def get_user(telegramID: TelegramID) -> User:
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    return User(**user)


@app.post(
    "/user/{telegramID}",
    tags=["User"],
    description="Creates new user by telegramID. If user exists return 400 error",
)
def post_user(telegramID: TelegramID) -> None:
    if users_collection.find_one({"telegramID": telegramID}) is not None:
        raise HTTPException(status_code=400, detail="User exist")
    user = User(telegramID=telegramID, projects=[])
    users_collection.insert_one(user.model_dump())


@app.put("/user/{telegramID}", tags=["User"], description="Not implemented yet")
def put_user(telegramID: TelegramID):
    raise NotImplementedError


@app.post(
    "/user/{telegramID}/project",
    tags=["User", "Project"],
    description="Creates new project for user by telegramID. If user not exist raise 400 error.",
)
def post_user_project(telegramID: TelegramID, project: NewProject) -> ProjectID:
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
def get_project(proejctID: ProjectID) -> Project:
    project = projects_collection.find_one({"ID": proejctID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    return project
