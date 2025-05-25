Hai This is Suprith 

Note : Since I have Deployed publically it will take some time to load data please co-operate

Below are the instruction to run project locally

1 -> Backend

- got to backend folder in command prompt
- enter this command in backend folder python -m venv venv
- enter this cmd in backend folder source venv/bin/activate   # Windows: venv\Scripts\activate
- enter this cmd in backend folder pip install flask flask-cors pymongo
- enter this cmd in backend folder create app.py file as child to backend folder
- run python app.py

create a cluster in mongodb stlast 
- I have deployed in cloud 
- So replace this code 
mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["database_name"]
collection = db["collection_name"]

with

client = MongoClient("mongodb+srv://<username>:<db_password>@cluster0.pum4ga9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["database_name"]
collection = db["collection_name"]

in app.py file in backend

In script.js file in frontend
- replace this line of code fetch('https://empty-cup-6y0t.onrender.com') with fetch('http://localhost:5000/') science you are using mongoDB as locally
        

to run locally 
Make sure you are using mongo db as a database 


Depolyment 

Frontend 
For frontend deployment i used vercel
website Live! at ( Used vercel ) :  https://empty-cup-qa7p.vercel.app/

Backend 
deployed backend code using Render 

Genereated Api for data : https://empty-cup-6y0t.onrender.com

