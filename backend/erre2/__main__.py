import os

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm
from starlette.responses import RedirectResponse

from erre2.authentication import Token, authenticate_user, create_token, get_hash
from erre2.database import crud, schemas, models
from erre2.database.db import engine, SessionLocal
from erre2.routers import users, course, server, summary
from erre2.configuration import ROOT_URL, setting_required

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(course.router)
app.include_router(server.router)
app.include_router(summary.router)

origins = [
    "https://navigator.erre2.fermitech.info",
]

if __debug__:
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
    return RedirectResponse("https://navigator.erre2.fermitech.dev/erre2/{}/".format(ROOT_URL))


@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    token = create_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


if __name__ == "__main__":
    BIND_IP = setting_required("BIND_IP")
    BIND_PORT = setting_required("BIND_PORT")

    with SessionLocal() as db:
        if not db.query(models.User).filter_by(uid=1).first():
            crud.create_user(db, schemas.UserCreate(email="admin@admin.com", hash=get_hash("password"), name="admin",
                                                    surname="admin"))
        if not db.query(models.Server).first():
            crud.create_server(db)
    uvicorn.run(app, host=BIND_IP, port=int(BIND_PORT), debug=__debug__)
