# As of time of writing, the below image contains vulnerabilities.
# In production, there would be an approved version available.

# Example FastAPI Python Dockerfile taken from
# https://fastapi.tiangolo.com/deployment/docker/#dockerfile

FROM python:3.12


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


COPY . /code


CMD ["fastapi", "run", "./main.py", "--port", "8000"]