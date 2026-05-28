import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE gallery_items ADD COLUMN image_url VARCHAR;"))
        conn.commit()
        print("Successfully added image_url column.")
    except Exception as e:
        print("Error or column already exists:", e)
