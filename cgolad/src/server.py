from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def main():
    return render_template('gameview.html')

app.run(port=5000)
