from pydantic import BaseModel


class NewProject(BaseModel):
    title: str
    slogan: str
    description: str
    tags: list[str]
