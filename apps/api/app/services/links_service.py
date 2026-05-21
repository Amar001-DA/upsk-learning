import random
import string

from sqlalchemy.orm import Session

from app.models import Link


def generate_code(length: int = 6):
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))


def create_short_link(db: Session, long_url: str, created_by: str = "system"):
    code = generate_code()

    link = Link(
        code=code,
        long_url=long_url,
        created_by=created_by,
    )

    db.add(link)
    db.commit()
    db.refresh(link)

    return link


def get_link_by_code(db: Session, code: str):
    return db.query(Link).filter(Link.code == code).first()
