from fastapi import Header, HTTPException, UploadFile
from contextlib import contextmanager
from erre2.database.db import SessionLocal
import aiofiles
import os


async def get_erre2_version():
    return "0.1.0"


async def get_auth_token(authorization: str = Header(...)):
    if authorization != "fuf":
        raise HTTPException(status_code=400, detail="tmp")


def get_db():
    with SessionLocal() as ses:
        yield ses

@contextmanager
def SessionManager():
    session = SessionLocal()
    yield session


async def save_file(file: UploadFile, summary):
    out_file_path = os.path.join("Files", "{}_".format(summary.sid)+file.filename)
    async with aiofiles.open(out_file_path, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)
    return file.filename
