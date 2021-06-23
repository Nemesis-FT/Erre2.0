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


class UserCreate(User):
    hash: bytes

    class Config:
        orm_mode = True


class Course(BaseModel):
    cid: int
    name: str
    professor: str
    curriculum: str
    year: int
    semester: int

    class Config:
        orm_mode = True


class Commits(BaseModel):
    cid: int
    description: str
    date: datetime

    class Config:
        orm_mode = True


class Summary(BaseModel):
    aid: int
    name: str
    filename: str
    downloads: int
    author: User
    course: Course
    commits: List[Commits]

    class Config:
        orm_mode = True


class Server(BaseModel):
    name: str
    university: str
    monetization_link: str
    motd: str
    owner: User