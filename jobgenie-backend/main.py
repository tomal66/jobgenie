from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_route import user_router
from routes.scraper_route import scraper_router

app = FastAPI()

origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(scraper_router, prefix='/api')
