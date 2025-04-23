from fastapi import FastAPI

app = FastAPI()

clicks = 0

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/getclicks")
def get_clicks():
    return clicks

@app.get("/incrementclicks")
def get_clicks():
    global clicks
    clicks += 1
    return clicks

# TODO: 
#    - Implement PostgreSQL database connection and relevant functions