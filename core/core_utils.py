from config import config
from keras.models import Model, load_model
from keras.backend import get_session
from keras.backend import set_session
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy
import cv2
import numpy as np
import dlib
import os
import pickle


img_size = config['img_size']

sess = tf.compat.v1.Session()
graph = tf.compat.v1.get_default_graph()
tf.compat.v1.keras.backend.set_session(sess)
model = load_model(config['model_path'])


def detectFaces(image):
    # image = img
    cropped_images = []
    net = cv2.dnn.readNetFromCaffe(config['detector']['meta_path'], config['detector']['model_path'])
    (h, w) = image.shape[:2]
    # cv2.imshow('aa', image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
    # blob = cv2.dnn.blobFromImage(cv2.resize(image, (w // 3, h // 3)), 1.0, (w // 3, h // 3), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()
    
    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        if confidence > config['detector']['confidence']:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")
            text = "{:.2f}%".format(confidence * 100)
            y = startY - 10 if startY - 10 > 10 else startY + 10
            cropped_images.append(image[startY: endY, startX: endX])
#             cv2.rectangle(image, (startX, startY), (endX, endY), (0, 0, 255), 2)
#             cv2.putText(image, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)

#     cv2.imshow("Output", cv2.resize(image, (500, 500)))
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

    return cropped_images

def prewhiten(x):
    if x.ndim == 4:
        axis = (1, 2, 3)
        size = x[0].size
    elif x.ndim == 3:
        axis = (0, 1, 2)
        size = x.size
    else:
        raise ValueError('Dimension should be 3 or 4')

    mean = np.mean(x, axis = axis, keepdims = True)
    std = np.std(x, axis = axis, keepdims = True)
    std_adj = np.maximum(std, 1.0 / np.sqrt(size))
    y = (x - mean) / std_adj
    
    return y

# Embedding the anchor
def l2Norm(embed):
    return embed / np.linalg.norm(embed)

def embedIt(fileName, isFile = True):
    global sess
    global graph
    tf.compat.v1.keras.backend.set_session(sess)
    with graph.as_default():
        img = cv2.imread(fileName) if isFile else fileName
        # cv2.imshow('aa', img)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_resized = cv2.resize(img, (img_size, img_size))
        embed = l2Norm(model.predict(prewhiten(img_resized.reshape(-1, img_size, img_size, 3))))
        
        return embed

# Crop faces from photos
def init(dirPath):
    photos = [f for f in os.listdir(dirPath) if os.path.isfile(dirPath + '/' + f)]
    # destPath = os.path.join(dirPath, config['detector']['dest_path'])
    # os.mkdir(destPath)
    cropped_faces = []

    for photo in photos:
        img = cv2.imread(dirPath + '/' + photo)
        c_faces = detectFaces(img)
        count = 0
        
        for c_face in c_faces:
            cropped_faces.append(c_face)
        #     cv2.imwrite(destPath + '/' + str(count) + photo, cropped_face)
        #     count += 1
    
    return cropped_faces

# Make embeddings
def build_embeds(cropped_faces):
    # photos = os.listdir(dirPath)
    vecs = []
    
    for face in cropped_faces:
        vecs.append({'name': 'na', 'embed': embedIt(face, isFile = False)})
    
    return vecs

# Predict the incoming vector
def pred_vecs(class_vecs, vecs):
    result = {
        'absent': len(class_vecs),
        'present': 0,
        'absentRNos': [i for i in range(1, len(class_vecs) + 1)]
    }

    for idxP in vecs:
        vec = idxP['embed']
        peep = person = 'noone'
        mi = np.linalg.norm(vec - class_vecs[0]['embed'])
        
        for peep in class_vecs:
            curr = np.linalg.norm(vec - peep['embed'])
            
            if curr <= mi:
                mi = curr
                person = peep['name']

        for i in range(len(result['absentRNos'])):
            if str(result['absentRNos'][i]) == str(person)[: len(person) - 4]:
                result['absentRNos'].pop(i)
                result['absent'] -= 1
                result['present'] += 1
                break

    return result
    # if mi > 0.88:
    #     person = 'na'