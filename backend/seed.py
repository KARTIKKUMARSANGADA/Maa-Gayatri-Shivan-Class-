import os
from database import engine, SessionLocal
from models import Base, Course, GalleryItem, Testimonial

def seed_db():
    print("Dropping all existing tables to avoid schema conflicts...")
    Base.metadata.drop_all(bind=engine)
    
    print("Creating all tables with latest schema (UUIDs)...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Seeding Courses...")
        courses = [
            {"title": "Basic to Advanced Blouse Stitching", "description": "Learn to stitch all types of blouses from simple cuts to designer patterns with perfect fitting.", "duration": "2 Months", "icon": "👗"},
            {"title": "Salwar Suit & Kurti Design", "description": "Master the art of cutting and stitching various styles of Salwar Suits, Kurtis, and bottom wear.", "duration": "1.5 Months", "icon": "👘"},
            {"title": "Complete Dress Making Course", "description": "A comprehensive course covering everything from basic measurements to advanced designer dresses.", "duration": "4 Months", "icon": "🧵"},
            {"title": "Advanced Embroidery & Aari Work", "description": "Specialized training in intricate hand embroidery, aari work, and traditional embellishments.", "duration": "3 Months", "icon": "🪡"},
            {"title": "Kids Wear Specialization", "description": "Learn to design and stitch comfortable, trendy, and traditional clothing for children of all ages.", "duration": "1 Month", "icon": "👶"},
            {"title": "Boutique Management", "description": "Turn your passion into a business. Learn client handling, fabric sourcing, and boutique operations.", "duration": "1 Month", "icon": "🏪"}
        ]
        for c in courses:
            db.add(Course(**c))
            
        print("Seeding Gallery...")
        gallery = [
            {'title': 'Student Work 1', 'span': 'col-span-1 row-span-1', 'icon': '👗'},
            {'title': 'Class Environment', 'span': 'col-span-1 md:col-span-2 row-span-1', 'icon': '🧵'},
            {'title': 'Student Work 2', 'span': 'col-span-1 row-span-2', 'icon': '🪡'},
            {'title': 'Event/Certification', 'span': 'col-span-1 md:col-span-2 row-span-1', 'icon': '📜'},
            {'title': 'Student Work 3', 'span': 'col-span-1 row-span-1', 'icon': '✂️'},
            {'title': 'Embroidery Workshop', 'span': 'col-span-1 row-span-2', 'icon': '🌺'},
            {'title': 'Student Work 4', 'span': 'col-span-1 row-span-1', 'icon': '👘'},
            {'title': 'Annual Exhibition', 'span': 'col-span-1 md:col-span-2 row-span-1', 'icon': '🎪'},
        ]
        for g in gallery:
            db.add(GalleryItem(**g))
            
        print("Seeding Testimonials...")
        testimonials = [
            {"name": "Pooja Patel", "text": "The training here is exceptional. I joined with zero knowledge and now I run my own small boutique from home. The teachers are very patient.", "role": "Former Student"},
            {"name": "Sneha Shah", "text": "Best tailoring class in Limbdi. The focus on practical skills and perfect fitting techniques gave me a lot of confidence.", "role": "Professional Tailor"},
            {"name": "Riya Desai", "text": "I completed the 4-month course and the experience was wonderful. The environment is very supportive for women.", "role": "Housewife"},
            {"name": "Komal Verma", "text": "Thanks to Maa Gayatri Shivan Class, I learned advanced aari work and embroidery. It helped me get orders for bridal blouses.", "role": "Boutique Owner"},
            {"name": "Aarti Rajput", "text": "The flexible timings and the step-by-step teaching method make this the perfect place to learn stitching while managing home.", "role": "Mother & Student"},
            {"name": "Nita Chauhan", "text": "I highly recommend the salwar suit course! We got to practice on real fabrics and learn about latest trending designs.", "role": "Fashion Enthusiast"}
        ]
        for t in testimonials:
            db.add(Testimonial(**t))
            
        db.commit()
        print("Database seeded successfully! 🎉")
        
    except Exception as e:
        db.rollback()
        print("Error seeding database:", e)
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
