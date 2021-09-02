from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    uid: Optional[int]
    name: str
    surname: str
    email: str

    class Config:
        orm_mode = True


class UserList(BaseModel):
    users: List[User]


class UserCreatePlain(User):
    password: str

    class Config:
        orm_mode = True


class UserCreate(User):
    hash: bytes

    class Config:
        orm_mode = True


class Course(BaseModel):
    cid: Optional[int]
    name: str
    professor: str
    curriculum: str
    year: int
    semester: int

    class Config:
        orm_mode = True


class CourseList(BaseModel):
    courses: List[Course]

    class Config:
        orm_mode = True


class Commit(BaseModel):
    cid: Optional[int]
    description: str
    date: datetime
    summary_id: int

    class Config:
        orm_mode = True


class Summary(BaseModel):
    sid: Optional[int]
    author_id: int
    course_id: int
    name: str
    filename: str
    downloads: int
    author: Optional[User]
    course: Optional[Course]
    commits: Optional[List[Commit]]

    class Config:
        orm_mode = True


class SummaryList(BaseModel):
    summaries: List[Summary]

    class Config:
        orm_mode = True


class SummaryUpdate(BaseModel):
    summary: Summary
    description: str

    class Config:
        orm_mode = True


class Server(BaseModel):
    name: str
    university: str
    monetization_link: str
    motd: str
    owner_id: int
    owner: Optional[User]

    class Config:
        orm_mode = True


class Planetarium(BaseModel):
    server: Server
    version: str
    type: str

    class Config:
        orm_mode = True
