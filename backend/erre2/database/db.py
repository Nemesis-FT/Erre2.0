import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from erre2.configuration import DB_URI

DB_POOL_SIZE = 100,
WEB_CONCURRENCY = 2,
val = 100 // 2
POOL_SIZE = max(val, 5)
engine = create_engine(
    DB_URI,
    pool_size=POOL_SIZE
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()