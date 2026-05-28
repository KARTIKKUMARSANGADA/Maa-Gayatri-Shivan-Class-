from pydantic import BaseModel
from typing import Optional

class CourseBase(BaseModel):
    title: str
    description: str
    duration: str
    icon: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: str

    class Config:
        from_attributes = True

class GalleryItemBase(BaseModel):
    title: str
    span: str
    icon: str

class GalleryItemCreate(GalleryItemBase):
    pass

class GalleryItem(GalleryItemBase):
    id: str

    class Config:
        from_attributes = True

class TestimonialBase(BaseModel):
    name: str
    text: str
    role: str

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: str

    class Config:
        from_attributes = True

class ContactInquiryBase(BaseModel):
    name: str
    phone: str
    course: str
    message: Optional[str] = None
    created_at: str

class ContactInquiryCreate(ContactInquiryBase):
    pass

class ContactInquiry(ContactInquiryBase):
    id: str

    class Config:
        from_attributes = True
