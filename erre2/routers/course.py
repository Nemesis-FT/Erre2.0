from fastapi import APIRouter, Depends, Request
from erre2.dependencies import get_auth_token, get_db
from erre2.authentication import get_current_user
from erre2.database.crud import get_course, get_courses, create_course, update_course
from sqlalchemy.orm import Session
from erre2.database import schemas, models
from typing import Optional
import bcrypt

router = APIRouter(
    prefix="/course",
    tags=["courses"],
    responses={404: {"description": "Not found"}}
)


@router.get("/", tags=["courses"], response_model=schemas.CourseList)
async def read_course_list(request: Request, course_id: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Returns list of all courses, or just one.
    """
    if not course_id:
        courses = get_courses(db)
        return schemas.CourseList(courses=courses)
    else:
        course = get_course(db, course_id)
        return schemas.CourseList(courses=[course, ])


@router.patch("/{course_id}", response_model=schemas.Course, tags=["courses"])
async def patch_course(update: schemas.Course, course_id: int, db: Session = Depends(get_db)):
    """
    Allows course patching
    """
    c = update_course(db, update, course_id)
    return schemas.Course(cid=c.cid, name=c.name, professor=c.professor, curriculum=c.curriculum, year=c.year,
                          semester=c.semester)


@router.post("/", tags=["courses"], response_model=schemas.Course)
async def create_course_(request: Request, course: schemas.Course, db: Session = Depends(get_db),
                         current_user: models.User = Depends(get_current_user)):
    """
    Allows the creation of a new course
    """
    course: models.Course = create_course(db, schemas.Course(name=course.name, professor=course.professor,
                                                             curriculum=course.curriculum, year=course.year,
                                                             semester=course.semester))
    if course:
        return schemas.Course(name=course.name, professor=course.professor, curriculum=course.curriculum,
                              year=course.year, semester=course.semester)
