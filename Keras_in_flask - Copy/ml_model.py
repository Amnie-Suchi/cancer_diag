import os
import numpy as np
from keras.applications.vgg16 import preprocess_input
from keras.models import load_model
from keras.preprocessing import image

def model_predict(img_path, model):

    # Preprocessing the image
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    y = model.predict(x)

    return np.argmax(y)