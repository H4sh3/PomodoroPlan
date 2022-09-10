FROM python:3.9.14
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN mv pomodoroPlan/.prod_env pomodoroPlan/.env