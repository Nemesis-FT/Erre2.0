from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import UploadFile
import bcrypt

from erre2.database import schemas, models


def get_user(db: Session, uid: int):
    return db.query(models.User).filter(models.User.uid == uid).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session):
    return db.query(models.User).all()


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
    if user.hash:
        db_user.password = user.hash
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user


def get_commit(db: Session, cid: int):
    return db.query(models.Commit).filter(models.Commit.cid == cid).first()


def get_commits(db: Session):
    return db.query(models.Summary).all()


def create_commit(db: Session, commit: schemas.Commit):
    if not get_summary(db, commit.summary_id):
        return
    db_commit = models.Commit(description=commit.description, date=commit.date, summary_id=commit.summary_id)
    db.add(db_commit)
    db.commit()
    db.refresh(db_commit)
    return db_commit


def get_course(db: Session, cid: int):
    return db.query(models.Course).filter(models.Course.cid == cid).first()


def get_courses(db: Session):
    return db.query(models.Course).all()


def create_course(db: Session, course: schemas.Course):
    db_course = models.Course(name=course.name, professor=course.professor, curriculum=course.curriculum,
                              year=course.year, semester=course.semester)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


def update_course(db: Session, course: schemas.Course, cid: int):
    db_course: models.Course = get_course(db, cid)
    if not db_course:
        return
    db_course.name = course.name
    db_course.professor = course.professor
    db_course.curriculum = course.curriculum
    db_course.year = course.year
    db_course.semester = course.semester
    db.commit()
    db.refresh(db_course)
    return db_course


def get_summary(db: Session, sid: int):
    return db.query(models.Summary).filter(models.Summary.sid == sid).first()


def get_summaries(db: Session):
    return db.query(models.Summary).all()


def get_summaries_course(db: Session, course_id: int):
    return db.query(models.Summary).filter(models.Summary.course_id == course_id).all()


def create_summary(db: Session, summary: schemas.Summary, file:UploadFile):
    if not get_course(db, summary.course_id):
        return
    db_summary = models.Summary(name=summary.name,
                                filename="tmp", downloads=0,
                                author_id=summary.author_id,
                                course_id=summary.course_id)
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    db_summary.filename = "{}_{}".format(db_summary.sid, file.filename)
    db.commit()
    db.refresh(db_summary)
    return db_summary


def update_summary(db: Session, summary: schemas.Summary, sid: int, description: str, file:UploadFile):
    db_summary = get_summary(db, sid)
    if not db_summary:
        return
    db_summary.filename = "{}_{}".format(summary.sid, file.filename)
    db.commit()
    create_commit(db, schemas.Commit(description=description, date=datetime.now(), summary_id=sid))
    db.refresh(db_summary)
    return db_summary


def get_server(db: Session):
    return db.query(models.Server).first()


def update_server(db: Session, update: schemas.Server):
    absent = False
    server: models.Server = get_server(db)
    if not server:
        server = models.Server()
        absent = True
    server.name = update.name
    server.university = update.university
    server.monetization_link = update.monetization_link
    server.motd = update.motd
    server.owner_id = update.owner_id
    if absent:
        db.add(server)
        db.commit()
    db.commit()
    db.refresh(server)
    return server
