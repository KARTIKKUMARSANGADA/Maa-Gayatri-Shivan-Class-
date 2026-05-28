import uuid
from sqlalchemy import Column, String, Text
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    description = Column(Text)
    duration = Column(String)
    icon = Column(String)

class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    span = Column(String)
    icon = Column(String)
    image_url = Column(String, nullable=True)

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    text = Column(Text)
    role = Column(String)

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    phone = Column(String)
    course = Column(String)
    message = Column(Text)
    created_at = Column(String)
