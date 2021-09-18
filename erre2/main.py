import os

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta

from starlette.responses import RedirectResponse

from erre2.routers import users, course, server, summary
from erre2.database import crud, schemas, models
from erre2.dependencies import get_db
from erre2.database.db import engine, SessionLocal
from erre2.authentication import Token, OAuth2PasswordRequestForm, authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, \
    create_token, get_hash

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(course.router)
app.include_router(server.router)
app.include_router(summary.router)

origins = [
    "https://navigator.erre2.fermitech.info",
]

if os.getenv("DEBUG"):
    origins.append(
        "http://localhost:3000",
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/files", StaticFiles(directory="Files"), name="files")

@app.get("/")
async def root():
    return RedirectResponse("https://navigator.erre2.fermitech.info/erre2/{}/".format(os.getenv("ROOT_URL")))


@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    token = create_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


if __name__ == "__main__":
    with SessionLocal() as db:
        if not db.query(models.User).filter_by(uid=1).first():
            crud.create_user(db, schemas.UserCreate(email="admin@admin.com", hash=get_hash("password"), name="admin",
                                                    surname="admin"))
        if not db.query(models.Server).first():
            crud.create_server(db)
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT")))
