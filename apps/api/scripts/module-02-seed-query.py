from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Link

db: Session = SessionLocal()

test_link = Link(
    code="abc123",
    long_url="https://google.com",
    created_by="amar"
)

existing = db.query(Link).filter(Link.code == "abc123").first()

if not existing:
    db.add(test_link)
    db.commit()
    print("Inserted code: abc123")

result = db.query(Link).filter(Link.code == "abc123").first()

print(f"Selected code: {result.code}")
print(f"Matched long_url: {result.long_url}")

db.close()
