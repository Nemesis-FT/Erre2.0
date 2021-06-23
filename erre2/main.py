from fastapi import Depends, FastAPI
import uvicorn

from erre2.dependencies import get_auth_token
from erre2.routers import users

app = FastAPI(dependencies=[Depends(get_auth_token)])

app.include_router(users.router)


@app.get("/")
async def root():
    return {
        "message": "This is the backend of Erre2.0. If you see this page, it means that the server is alive and well."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)