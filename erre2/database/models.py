from sqlalchemy import Integer, String, LargeBinary, Column, Boolean, ForeignKey, SmallInteger, DateTime
from sqlalchemy.orm import relationship

from erre2.database.db import Base


class User(Base):
    __tablename__ = "user"

    uid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(LargeBinary, nullable=False)
    enabled = Column(Boolean, default=True)

    summaries = relationship("Summary", back_populates="author")
    server = relationship("Server", back_populates="owner")


class Summary(Base):
    __tablename__ = "summary"

    sid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    downloads = Column(Integer, default=0)

    author = relationship("User", back_populates="summaries")
    course = relationship("Course", back_populates="docs")
    commits = relationship("Commit", back_populates="summary")

    author_id = Column(Integer, ForeignKey("user.uid"))
    course_id = Column(Integer, ForeignKey("course.cid"))


class Commit(Base):
    __tablename__ = "commit"

    cid = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String)
    date = Column(DateTime, nullable=False)

    summary = relationship("Summary", back_populates="commits")

    summary_id = Column(Integer, ForeignKey("summary.sid"))


class Course(Base):
    __tablename__ = "course"

    cid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    professor = Column(String, nullable=False)
    curriculum = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)
    docs = relationship("Summary", back_populates="course")


class Server(Base):
    __tablename__ = "server"

    sid = Column(SmallInteger, primary_key=True)
    name = Column(String)
    university = Column(String, nullable=False)
    monetization_link = Column(String)
    motd = Column(String)

    owner = relationship("User", back_populates="server")

    owner_id = Column(Integer, ForeignKey("user.uid"))