from fastapi import Header, HTTPException


async def get_auth_token(authorization: str = Header(...)):
    if authorization != "fuf":
        raise HTTPException(status_code=400, detail="tmp")
