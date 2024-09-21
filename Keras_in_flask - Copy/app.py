import os
import joblib
import numpy as np
from keras.applications.vgg16 import preprocess_input
from keras.models import load_model
from keras.preprocessing import image
from flask import Flask, redirect, url_for, request, render_template, jsonify
from werkzeug.utils import secure_filename
from ml_model import model_predict

app = Flask(__name__)

model = joblib.load('classifier_model.pkl')



@app.route('/user/<username>')
def show_user(username):
    return 'Hi %s!' %username


@app.route('/user_id/<int:user_id>')
def show_user_id(user_id):
    return 'Your user id is:  %d!' %user_id

@app.route('/')
def greet():
    return render_template("landing_html.html")

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        f = request.files['file']   #got it from form-data

        #save the read photo to the uploads file
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename)
        )

        f.save(file_path)








if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5000)

