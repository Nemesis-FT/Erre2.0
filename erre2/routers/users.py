from fastapi import APIRouter, Depends, Request, HTTPException

from erre2.database.models import Server
from erre2.dependencies import get_auth_token, get_db
from erre2.authentication import get_current_user
from erre2.database.crud import get_users, create_user, get_user, update_user, get_server
from sqlalchemy.orm import Session
from erre2.database import schemas, models
from typing import Optional
import bcrypt

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}}
)


@router.get("/me", tags=["users"], response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    """
    Returns data about the current user.
    """
    return current_user


@router.get("/", tags=["users"], response_model=schemas.UserList)
async def read_users_list(request: Request, user_id: Optional[int] = None, db: Session = Depends(get_db),
                          current_user: models.User = Depends(get_current_user)):
    """
    Returns list of all users, or just one.
    """
    if not user_id:
        users = get_users(db)
        return schemas.UserList(users=users)
    else:
        user = get_user(db, user_id)
        return schemas.UserList(users=[user, ])


@router.post("/", tags=["users"], response_model=schemas.User)
async def create_user_(request: Request, user: schemas.UserCreatePlain, db: Session = Depends(get_db),
                       current_user: models.User = Depends(get_current_user)):
    """
    Allows the creation of a new user
    """
    h = bcrypt.hashpw(bytes(user.password, encoding="utf-8"), bcrypt.gensalt())
    user: models.User = create_user(db,
                                    schemas.UserCreate(name=user.name, surname=user.surname,
                                                       email=user.email, hash=h))
    if user:
        return schemas.User(uid=user.uid, name=user.name, surname=user.surname, email=user.email)


@router.patch("/{user_id}", tags=["users"], response_model=schemas.User)
async def update_user_(user: schemas.UserCreatePlain, user_id: int, db: Session = Depends(get_db),
                       current_user: models.User = Depends(get_current_user)):
    """
    Allows user update
    """
    server: Server = get_server(db)
    if user_id != current_user.uid and server.owner_id!=user_id:
        raise HTTPException(status_code=403, detail="You cannot edit other users.")
    h = bcrypt.hashpw(bytes(user.password, encoding="utf-8"), bcrypt.gensalt())
    if user.password == " ":
        h = None
    user_n = update_user(db, schemas.UserCreate(name=user.name, surname=user.surname, hash=h, email=user.email),
                         user_id)
    if user_n:
        return schemas.User(uid=user_n.uid, name=user_n.name, surname=user_n.surname, email=user_n.email)
