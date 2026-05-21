from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.link import CreateLinkRequest, LinkResponse
from app.services.links_service import create_short_link, get_link_by_code


router = APIRouter(prefix="/links", tags=["links"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=LinkResponse)
def create_link(payload: CreateLinkRequest, db: Session = Depends(get_db)):
    return create_short_link(db, str(payload.long_url))


@router.get("/{code}", response_model=LinkResponse)
def get_link(code: str, db: Session = Depends(get_db)):
    link = get_link_by_code(db, code)

    if not link:
        raise HTTPException(status_code=404, detail="Link not found")

    return link
