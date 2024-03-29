from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user_router, project_router, template_router, module_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(project_router)
app.include_router(template_router)
app.include_router(module_router)


@app.get("/", include_in_schema=False)
def get_root() -> RedirectResponse:
    return RedirectResponse("/docs")
