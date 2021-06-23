from fastapi import APIRouter, Depends
from erre2.dependencies import get_auth_token

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_auth_token)],
    responses={404: {"description": "Not found"}}
)


@router.get("/users/", tags=["users"])
async def read_users():
    return {"message": "helo"}