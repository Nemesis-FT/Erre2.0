from jose import JWTError, jwt
from pydantic import BaseModel
from typing import Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
import bcrypt
from erre2.database import models
from sqlalchemy.orm import Session
from erre2.dependencies import get_db, SessionLocal
from erre2.database.crud import get_user_by_email, get_server
from datetime import datetime, timedelta
from passlib.context import CryptContext
from erre2.database.db import SessionLocal

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def check_password(h, password):
    return pwd_context.verify(password, h)


def get_hash(password):
    return pwd_context.hash(password)


def authenticate_user(email: str, password: str):
    with SessionLocal() as db:
        user: models.User = get_user_by_email(db, email)
        if not user:
            return False
        if not check_password(user.password, password):
            return False
        return user


def create_token(data: dict):
    encode = data.copy()
    encode.update({"exp": datetime.utcnow() + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)})
    return jwt.encode(encode, SECRET_KEY, ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    with SessionLocal() as db:
        user = get_user_by_email(db, token_data.email)
        if user is None:
            raise credentials_exception
        return user


def check_admin(user):
    with SessionLocal() as db:
        server = get_server(db)
        if server.owner_id!=user.uid:
            return False
        return True



