import core_utils as cu
import json
import pickle

tempDir = input()

with open('core/class_vecs.pickle', 'rb') as handle:
    class_vecs = pickle.load(handle)

destPath = cu.init(tempDir)
vecs = cu.build_embeds(destPath)
predictedPerson = cu.pred_vecs(class_vecs, vecs[0]['embed'])

print(json.dumps({1: predictedPerson}))