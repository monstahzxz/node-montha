# TF = 1.14.0 Keras = 2.2.5

import core_utils as cu
import json
import pickle
from flask import Flask, request

app = Flask(__name__)
 
@app.route('/')
def index():
	return "Flask server"
 
@app.route('/compute', methods = ['POST'])
def compute():
    tempDir = request.get_json()['tempDir']

    with open('core/class_vecs.pkl', 'rb') as handle:
        class_vecs = pickle.load(handle)

    cropped_faces = cu.init(tempDir)
    vecs = cu.build_embeds(cropped_faces)
    result = cu.pred_vecs(class_vecs, vecs)

    return json.dumps(result)

app.run(port = 5000)