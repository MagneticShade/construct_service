FROM python:alpine3.10
ENV TELEGRAM_TOKEN ${TELEGRAM_TOKEN}
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
CMD python3 /code/bot.py
