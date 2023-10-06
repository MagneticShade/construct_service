from fastapi import APIRouter, HTTPException
from app.models import ModuleID, Module, UpdateModule, Template
from app.database import modules_collection, templates_collection


router = APIRouter(prefix="/module")


@router.get(
    "/{moduleID}",
    tags=["Module"],
    description="Get module by id. If module not exist raises 400 error",
)
async def get_module(moduleID: ModuleID) -> Module:
    module = modules_collection.find_one({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    return module


@router.patch(
    "/{moduleID}",
    tags=["Module"],
    description="Updates module properties with only provided fields. If field is not provided its value not updates. If module not exist raises 400 error",
)
async def patch_module(moduleID: ModuleID, updates: UpdateModule) -> None:
    module = modules_collection.find_one_and_delete({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    module = module(**{**module, **updates.model_dump(exclude_none=True)})
    modules_collection.insert_one(module.model_dump())


@router.delete(
    "/{moduleID}",
    tags=["Module"],
    description="Deletes module by id. If module not exist raises 400 error",
)
async def delete_module(moduleID: ModuleID) -> None:
    module = modules_collection.find_one_and_delete({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    module = Module(**module)
    template = templates_collection.find_one_and_delete({"ID": module.template})
    if template is not None:
        template = Template(**template)
        template.modules.remove(module.ID)
        templates_collection.insert_one(template.model_dump())
