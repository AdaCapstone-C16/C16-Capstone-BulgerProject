import pyrebase
import json
import os

config = {
    "apiKey": os.getenv('APIKEY'),
    "authDomain": "well-weathered.firebaseapp.com",
    "databaseURL": "https://well-weathered-default-rtdb.firebaseio.com",
    "projectId": "well-weathered",
    "storageBucket": "well-weathered.appspot.com",
    "messagingSenderId": "668429899356",
    "appId": "1:668429899356:web:5052bfcd5094cea141f899",
    "measurementId": "G-2EHQJQ5258"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

if __name__ == '__main__':
    with open("peak_data.json","r") as f:
        file_contents = json.load(f)

    db.child("peaks").set(file_contents)