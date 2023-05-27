from keras.models import load_model  # TensorFlow is required for Keras to work
import cv2
import json
import numpy as np

class CapyModel():
    def __init__(self):
        # Disable scientific notation for clarity
        np.set_printoptions(suppress=True)

        # Load the model
        self.model = load_model("static/classifier/keras_Model.h5", compile=False)

        # Load the labels
        with open("static/classifier/labels.json", "r") as fp:
           self.class_names = json.load(fp)
 

    def classify_image(self, image):
        # Resize the raw image into (224-height,224-width) pixels
        image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)

        # Make the image a numpy array and reshape it to the models input shape.
        image = np.asarray(image, dtype=np.float32).reshape(1, 224, 224, 3)

        # Normalize the image array
        image = (image / 127.5) - 1

        # Predicts the model
        prediction = self.model.predict(image)
        index = np.argmax(prediction)
        class_name = self.class_names[str(index)]
        confidence_score = prediction[0][index]

        # Print prediction and confidence score
        predict_class = class_name
        confidence_score = np.round(confidence_score * 100)

        prediction = {
            'class': predict_class,
            'confidence_score': confidence_score
        }

        return prediction