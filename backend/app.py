from flask import Flask, jsonify, send_from_directory, redirect
from flask_cors import CORS
import os
import markdown

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

# Serve React App
@app.route('/')
@app.route('/intro_finance_form')
@app.route('/financial_instruments_form')
@app.route('/risk_return_form')
@app.route('/wacc/wacc_form')
@app.route('/investment_analysis_form')
@app.route('/stock_game')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

# API route to get Ch1 content
@app.route('/get_ch1_content')
def get_ch1_content():
    ch1_md_path = os.path.join(app.static_folder, 'static/readings/Ch1.md')
    try:
        with open(ch1_md_path, 'r') as file:
            content = file.read()
        html_content = markdown.markdown(content)
        return jsonify({'content': html_content})
    except FileNotFoundError:
        return jsonify({'error': 'Markdown file not found'}), 404

# Add the callback route for Schwab API OAuth2 (handled by auth.py)
@app.route('/auth/callback')
def callback():
    # Delegating this to the auth_module
    return redirect('/auth/callback')

if __name__ == '__main__':
    app.run(debug=True)