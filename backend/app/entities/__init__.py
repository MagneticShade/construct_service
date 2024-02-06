from .FormEntity import FormEntity
from .ModelEntity import ModuleEntity
from .ProjectEntity import ProjectEntity
from .UserEntity import UserEntity

from app.database import modules_collection,forms_collection,projects_collection,users_collection

modules=ModuleEntity(modules_collection)
forms=FormEntity(forms_collection)
projects=ProjectEntity(projects_collection)
users=UserEntity(users_collection)