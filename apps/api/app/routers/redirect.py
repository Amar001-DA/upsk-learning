from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.services.links_service import get_link_by_code

router = APIRouter(tags=["redirect"])

RESERVED_CODES = {"health", "docs", "openapi.json", "redoc"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/r/{code}")
def redirect_to_url(code: str, db: Session = Depends(get_db)):

    if code in RESERVED_CODES:
        raise HTTPException(status_code=404, detail="Reserved route")

    link = get_link_by_code(db, code)

    if not link:
        raise HTTPException(status_code=404, detail="Short link not found")

    return RedirectResponse(url=link.long_url)
