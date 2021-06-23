from fastapi import APIRouter, Depends
from erre2.dependencies import get_auth_token
from erre2.authentication import get_current_user
from erre2.database import schemas, models

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