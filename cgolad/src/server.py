from flask import Flask, render_template
from flask_cors import CORS

#html = ['stage_one.html', 'stage_two.html']
#stage = int(input("What Stage? "))
#html_to_render = html[stage - 1]

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    return render_template('main.html')
    #return render_template(html_to_render)

@app.route('/stage-one')
def stage_one():
    return render_template('stage_one.html')


@app.route('/stage-two')
def stage_two():
    return render_template('stage_two.html')


# Use for testing on same computer
app.run(port=6574)

# Use for testing on another computer
#app.run(host='0.0.0.0', port=80)
