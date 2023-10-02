from fastapi import FastAPI, HTTPException
from pymongo import MongoClient

app = FastAPI()

mongoClient = MongoClient(host="mongo_backend", port=27017)
database = mongoClient.get_database("backend")
users_collection = database.get_collection("users")


TelegramID = str


@app.get("/user/{telegramID}", tags=["User"])
def get_user(telegramID: TelegramID) -> TelegramID:
    raise NotImplementedError


@app.post("/user/{telegramID}", tags=["User"])
def post_user(telegramID: TelegramID) -> None:
    if users_collection.find_one({"telegramID": telegramID}) is not None:
        raise HTTPException(status_code=400, detail="User exist")
    users_collection.insert_one({"telegramID": telegramID})


@app.put("/user/{telegramID}", tags=["User"])
def put_user(telegramID: TelegramID):
    raise NotImplementedError
