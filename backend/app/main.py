from fastapi import FastAPI
from .database import Base, engine
from . import models
from .routes import employees, attendance
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

origins = [
    "http://localhost:5173",                 # local frontend
    "https://hrms-lite-chi.vercel.app",       # vercel frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}
