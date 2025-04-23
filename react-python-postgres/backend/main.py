from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clicks = 0

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/getclicks")
def get_clicks():
    return {clicks}

@app.get("/incrementclicks")
def get_clicks():
    global clicks
    clicks += 1
    return clicks

@app.get("/resetclicks")
def get_clicks():
    global clicks
    clicks = 0
    return clicks

# TODO: 
#    - Implement PostgreSQL database connection and relevant functions