# As of time of writing, the below image contains vulnerabilities.
# In production, there would be an approved version available.

# Example FastAPI Python Dockerfile taken from
# https://fastapi.tiangolo.com/deployment/docker/#dockerfile

FROM python:3.9

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./main.py" ]