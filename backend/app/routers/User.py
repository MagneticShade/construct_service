import os
import uuid
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from app.database import users_collection, projects_collection
from app.models import (
    TelegramID,
    ProjectID,
    NewUser,
    User,
    UpdateUser,
    NewProject,
    Project,
)

router = APIRouter(prefix="/user")


@router.get(
    "/{telegramID}",
    tags=["User"],
    description="Return user by its telegramID. If user not exist raises 400 error",
)
async def get_user(telegramID: TelegramID) -> User:
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    return User(**user)


@router.post(
    "/{telegramID}",
    tags=["User"],
    description="Creates new user by telegramID. If user exists return 400 error",
)
async def post_user(telegramID: TelegramID, user: NewUser) -> None:
    if users_collection.find_one({"telegramID": telegramID}) is not None:
        raise HTTPException(status_code=400, detail="User exist")
    user = User(**user.model_dump(), projects=[], telegramID=telegramID)
    users_collection.insert_one(user.model_dump())


@router.patch(
    "/{telegramID}",
    tags=["User"],
    description="Updates user's properties with only provided fields. If field is not provided its value not updates. If user not exist raises 400 error",
)
async def patch_user(telegramID: TelegramID, updates: UpdateUser) -> None:
    user = users_collection.find_one_and_delete({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    user = User(**{**user, **updates.model_dump(exclude_none=True)})
    users_collection.insert_one(user.model_dump())


@router.post(
    "/{telegramID}/image",
    tags=["User"],
    description="Replace old user's image with new if exist. If image is not svg raises 400 error. If user not exist raises 400 error",
)
async def post_user_image(telegramID: TelegramID, file: UploadFile = File()) -> None:
    if file.content_type != "image/svg+xml":
        raise HTTPException(status_code=400, detail="Image must be in svg format")
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    file.filename = f"{telegramID}"
    contents = await file.read()
    with open(f"app/images/{file.filename}", "wb") as f:
        f.write(contents)


@router.get(
    "/{telegramID}/image",
    tags=["User"],
    description="Return user's image. If user not exist raises 400 error. If logo not exist raises 404 error",
)
async def get_user_image(telegramID: TelegramID) -> FileResponse:
    if users_collection.find_one({"telegramID": telegramID}) is None:
        raise HTTPException(status_code=400, detail="User not exist")
    path = f"app/images/{telegramID}"
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="User's image not exist")
    return FileResponse(path, media_type="image/svg+xml")


@router.post(
    "/{telegramID}/project",
    tags=["User", "Project"],
    description="Creates new project for user by telegramID. If user not exist raise 400 error.",
)
async def post_user_project(telegramID: TelegramID, project: NewProject) -> ProjectID:
    user = User(**users_collection.find_one_and_delete({"telegramID": telegramID}))
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    projectID = str(uuid.uuid4())
    project = Project(
        **project.model_dump(), ID=projectID, templates=[], owner=telegramID
    )
    user.projects.append(projectID)
    users_collection.insert_one(user.model_dump())
    projects_collection.insert_one(project.model_dump())
    return projectID