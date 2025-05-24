from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Connect to local MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.1")
db = client["emptyCup"]
collection = db["companies"]

# GET all companies
@app.route("/companies", methods=["GET"])
def get_companies():
    companies = list(collection.find({}, {"_id": 0}))  # exclude MongoDB _id
    print(companies)
    return jsonify(companies)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

