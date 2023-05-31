#! python

from flask import Flask, render_template, request, Response
from login import login_bp
from static.classifier.keras_model import CapyModel
import base64
import cv2
import tempfile
import json

app = Flask(__name__)
app.register_blueprint(login_bp)

camera = None

uploaded_video = None
capy_model = CapyModel()

@app.route('/')
def main():
    return render_template('login.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/camera')
def _camera():
    uploaded_video = None
    return index()

def gen_frames_and_boolean():
    global camera, uploaded_video
    
    while True:
        if uploaded_video:
            if camera:
                camera.release()
                camera = None
            
            ret, frame = uploaded_video.read()

            if not ret:
                uploaded_video.set(cv2.CAP_PROP_POS_FRAMES, 0)
                continue    
        else:

            if not camera:
                camera = cv2.VideoCapture(0)

            ret, frame = camera.read()

            if not ret:
                continue
        
        prediction = capy_model.classify_image(frame)
        capybool = prediction['class'] == 'Capybara'
        
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        yield {
            'frame': frame_base64,
            'boolean': capybool
        }

@app.route('/video_feed_with_boolean')
def video_feed_with_boolean():
    response = gen_frames_and_boolean()

    return Response(
        (json.dumps(item) for item in response),
        mimetype='application/json'
    )


@ app.route('/upload_video', methods=['POST'])
def upload_video():
    global camera, uploaded_video
    source_toggle = request.form.get("source-toggle")
    if source_toggle == "upload":
        if 'video-upload' not in request.files:
            return "Arquivo de vídeo não enviado", 400
        file = request.files['video-upload']
        if file.filename == '':
            return "Nenhum arquivo selecionado", 400

        temp_video = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp_video.name)

        if uploaded_video:
            uploaded_video.release()

        uploaded_video = cv2.VideoCapture(temp_video.name)
    else:
        if uploaded_video:
            uploaded_video.release()
            uploaded_video = None
        camera = cv2.VideoCapture(0)
    return index()


if __name__ == '__main__':
    app.run(debug=True)
