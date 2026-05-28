from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import os

import models, schemas, crud
from database import engine, get_db

# Create DB tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Maa Gayatri Shivan Class API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AUTHENTICATION ---
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(req: LoginRequest):
    admin_user = os.getenv("ADMIN_USERNAME", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "admin123")
    
    if req.username == admin_user and req.password == admin_pass:
        return {"success": True}
    raise HTTPException(status_code=401, detail="Invalid username or password")

# --- COURSES ---

@app.get("/api/courses/", response_model=List[schemas.Course])
def read_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = crud.get_courses(db, skip=skip, limit=limit)
    return courses

@app.post("/api/courses/", response_model=schemas.Course)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    return crud.create_course(db=db, course=course)

@app.delete("/api/courses/{course_id}", response_model=schemas.Course)
def delete_course(course_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_course(db, course_id=course_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Course not found")
    return deleted

# --- GALLERY ---

@app.get("/api/gallery/", response_model=List[schemas.GalleryItem])
def read_gallery(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_gallery_items(db, skip=skip, limit=limit)
    return items

@app.post("/api/gallery/", response_model=schemas.GalleryItem)
def create_gallery_item(item: schemas.GalleryItemCreate, db: Session = Depends(get_db)):
    return crud.create_gallery_item(db=db, item=item)

@app.delete("/api/gallery/{item_id}", response_model=schemas.GalleryItem)
def delete_gallery_item(item_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_gallery_item(db, item_id=item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return deleted

# --- TESTIMONIALS ---

@app.get("/api/testimonials/", response_model=List[schemas.Testimonial])
def read_testimonials(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    testimonials = crud.get_testimonials(db, skip=skip, limit=limit)
    return testimonials

@app.post("/api/testimonials/", response_model=schemas.Testimonial)
def create_testimonial(testimonial: schemas.TestimonialCreate, db: Session = Depends(get_db)):
    return crud.create_testimonial(db=db, testimonial=testimonial)

@app.delete("/api/testimonials/{testimonial_id}", response_model=schemas.Testimonial)
def delete_testimonial(testimonial_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_testimonial(db, testimonial_id=testimonial_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return deleted

# --- INQUIRIES ---

@app.get("/api/inquiries/", response_model=List[schemas.ContactInquiry])
def read_inquiries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    inquiries = crud.get_inquiries(db, skip=skip, limit=limit)
    return inquiries

@app.post("/api/inquiries/", response_model=schemas.ContactInquiry)
def create_inquiry(inquiry: schemas.ContactInquiryCreate, db: Session = Depends(get_db)):
    return crud.create_inquiry(db=db, inquiry=inquiry)

@app.delete("/api/inquiries/{inquiry_id}", response_model=schemas.ContactInquiry)
def delete_inquiry(inquiry_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_inquiry(db, inquiry_id=inquiry_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return deleted
