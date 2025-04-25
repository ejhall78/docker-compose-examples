from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import create_engine, SQLModel, Session, select, Field

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

class ClickCounter(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    clicks: int

db_url = "postgresql://pguser:pgpassword@db:5432/clicksdb"
engine = create_engine(db_url, echo=True)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    click_counter = ClickCounter(name="ClickCounter", clicks=0)
    with Session(engine) as session:
        # See if ClickCounter already exists
        statement = select(ClickCounter)
        results = session.exec(statement)
        for clicker in results: # hacky way to see if it exists and return if it does
            print("clicker:", clicker)
            return
        
        session.add(click_counter) # if it doesn't exist, insert
        session.commit()

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

@app.get("/incrementclicksdb")
def get_clicks():
    with Session(engine) as session:
        statement = select(ClickCounter).where(ClickCounter.name == "ClickCounter")
        results = session.exec(statement)
        current_clicks = results.one()
        current_clicks.clicks += 1
        session.add(current_clicks)
        session.commit()
        session.refresh(current_clicks)
        return current_clicks.clicks

@app.get("/getclicksdb")
def get_clicks_db():
    with Session(engine) as session:
        statement = select(ClickCounter).where(ClickCounter.name == "ClickCounter")
        results = session.exec(statement)
        current_clicks = results.one()
        return current_clicks.clicks

@app.get("/resetclicksdb")
def get_clicks():
    with Session(engine) as session:
        statement = select(ClickCounter).where(ClickCounter.name == "ClickCounter")
        results = session.exec(statement)
        current_clicks = results.one()
        current_clicks.clicks = 0
        session.add(current_clicks)
        session.commit()
        session.refresh(current_clicks)
        return current_clicks.clicks