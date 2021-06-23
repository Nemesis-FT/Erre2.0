from fastapi import Header, HTTPException
from erre2.database.db import SessionLocal


async def get_auth_token(authorization: str = Header(...)):
    if authorization != "fuf":
        raise HTTPException(status_code=400, detail="tmp")


def get_db():
    db = SessionLocal()
    return db





