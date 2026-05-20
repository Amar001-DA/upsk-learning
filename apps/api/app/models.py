from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True, nullable=False)
    long_url = Column(String, nullable=False)
    created_by = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ClickEvent(Base):
    __tablename__ = "click_events"

    id = Column(Integer, primary_key=True, index=True)
    link_id = Column(Integer, ForeignKey("links.id"), index=True)
    user_agent = Column(String)
    referrer = Column(String)
    ip_hash = Column(String)
    clicked_at = Column(DateTime(timezone=True), server_default=func.now())
