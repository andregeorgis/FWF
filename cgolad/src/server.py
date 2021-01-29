from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return render_template('gameview.html')

# Use for testing on same computer
app.run(port=6574)

# Use for testing on another computer
#app.run(host='0.0.0.0', port=80)
