from flask import Flask, render_template, redirect, jsonify

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
from flask_pymongo import PyMongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
app.config["MONGO_URI"] = "mongodb://localhost:27017/android_apps"
mongo = PyMongo(app)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/categories")
def categories():
    """Return the homepage."""
    return render_template("categories.html")


@app.route("/top_apps")
def top_apps():
    """Return a list of sample names."""
    top_apps = mongo.db.top_apps.find_one()
    top_apps_clean = {k: v for k, v in top_apps.items() if k !="_id"}
    
    # Return a nested dictionary for tio ten apps for every category
    return jsonify(top_apps_clean)

@app.route("/all_apps")
def all_apps():
    """Return a list of sample names."""
    apps = []
    records = mongo.db.all_apps.find()
    for record in records:
        apps.append({k: v for k, v in record.items() if k !="_id"})
    
    # Return a list dictionaries with records about each app
    return jsonify(apps)


if __name__ == "__main__":
    app.run(debug=True)

if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response