from sqlalchemy.orm import Session
import bcrypt

from erre2.database import schemas, models


def get_user(db: Session, uid: int):
    return db.query(models.User).filter(models.User.uid == uid).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, name=user.name, surname=user.surname, password=user.hash)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.UserCreate, uid: int):
    db_user = get_user(db, uid)
    if not db_user:
        return
    db_user.name = user.name
    db_user.surname = user.surname
    db_user.password = user.hash
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user
