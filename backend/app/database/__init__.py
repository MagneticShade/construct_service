from pymongo import MongoClient as _MongoClient

_mongoClient = _MongoClient(host="mongo_backend", port=27017)
_database = _mongoClient.get_database("backend")
users_collection = _database.get_collection("users")
projects_collection = _database.get_collection("projects")
forms_collection = _database.get_collection("forms")
modules_collection = _database.get_collection("modules")