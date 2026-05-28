from sqlalchemy.orm import Session
import models, schemas

# Courses
def get_courses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Course).offset(skip).limit(limit).all()

def create_course(db: Session, course: schemas.CourseCreate):
    db_course = models.Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def delete_course(db: Session, course_id: str):
    db_course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if db_course:
        db.delete(db_course)
        db.commit()
    return db_course

# Gallery
def get_gallery_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.GalleryItem).offset(skip).limit(limit).all()

def create_gallery_item(db: Session, item: schemas.GalleryItemCreate):
    db_item = models.GalleryItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_gallery_item(db: Session, item_id: str):
    db_item = db.query(models.GalleryItem).filter(models.GalleryItem.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

# Testimonials
def get_testimonials(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Testimonial).offset(skip).limit(limit).all()

def create_testimonial(db: Session, testimonial: schemas.TestimonialCreate):
    db_testimonial = models.Testimonial(**testimonial.model_dump())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def delete_testimonial(db: Session, testimonial_id: str):
    db_testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db.delete(db_testimonial)
        db.commit()
    return db_testimonial

# Inquiries
def get_inquiries(db: Session, skip: int = 0, limit: int = 100):
    # order by created_at desc (latest first)
    return db.query(models.ContactInquiry).order_by(models.ContactInquiry.created_at.desc()).offset(skip).limit(limit).all()

def create_inquiry(db: Session, inquiry: schemas.ContactInquiryCreate):
    db_inquiry = models.ContactInquiry(**inquiry.model_dump())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

def delete_inquiry(db: Session, inquiry_id: str):
    db_inquiry = db.query(models.ContactInquiry).filter(models.ContactInquiry.id == inquiry_id).first()
    if db_inquiry:
        db.delete(db_inquiry)
        db.commit()
    return db_inquiry
