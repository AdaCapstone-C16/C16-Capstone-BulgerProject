#import config
import pyrebase
from flask import *

config = {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

# db.child("peaks").push({"name": "Lia", "coordinates": 123})
# db.child("peaks").push({"name": "Roslyn", "coordinates": 456})
# db.child("peaks").push({"name": "Areeba", "coordinates": 789})

# users = db.child("peaks").child("name").get()
# print(users.key())

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def basic():
    if request.method == 'POST':
        name = request.form['name']
        coordinates = request.form['coordinates']
        
        db.child("peaks").push({"name": name, "coordinates": coordinates})
        
        peaks = db.child("peaks").get()
        peak = peaks.val()
        
        return render_template('index.html', t=peak.values())
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
