config = {
    'model_path': 'core/model/facenet_keras.h5',
    'detector': {
        'meta_path': 'core/dnn/prototxt/deploy.prototxt',
        'model_path': 'core/dnn/res10_300x300_ssd_iter_140000_fp16.caffemodel',
        'confidence': 0.3
    },
    'img_size': 160,
}