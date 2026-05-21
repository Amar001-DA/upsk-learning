from fastapi import FastAPI

from app.config import settings
from app.routers.links import router as links_router
from app.routers.redirect import router as redirect_router


app = FastAPI()


@app.get("/health")
def health_check():
    return {"ok": True, "port": settings.port}


app.include_router(links_router)
app.include_router(redirect_router)
