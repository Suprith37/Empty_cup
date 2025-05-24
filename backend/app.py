
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# Use Mongo URI from environment variable
mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["emptyCup"]
collection = db["companies"]

@app.route("/", methods=["GET"])
def get_companies():
    companies = list(collection.find({}, {"_id": 0}))
    return jsonify(companies)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Required for Render
