from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def landingPage():
    return render_template('signin.html')

@app.route('/tutorial/<int:tutorialPage>')
def tutorialPage(tutorialPage):
    return render_template('tutorial{}.html'.format(tutorialPage))

@app.route('/test')
def test():
    return render_template('navbar.html')

@app.route('/game')
def game():
    return render_template('dashboard.html')

@app.route('/process', methods=['POST'])
def process():
    input_data = request.form.get('nameField')
    # Process the data
    result = samplePrint(input_data)
    return jsonify({'result': result})

def samplePrint(input_data):
    # Example processing function
    print("Hello")
    print(str(input_data))
    return f"Processed data: {input_data}"

if __name__ == '__main__':
    app.run(debug=True)