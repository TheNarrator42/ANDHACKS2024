import os
import base64
import requests
import webbrowser
import json
from flask import Flask, Blueprint, request, jsonify, render_template
from loguru import logger

auth_module = Blueprint(
    'auth_module',
    __name__,
    template_folder='../../frontend/templates',  # Path to templates directory
    static_folder='../../frontend/static'       # Path to static directory
)

# My client credentials
CLIENT_KEY = '82XokI8wyGruGPl49hOA4l6jh06UcDVu'
CLIENT_SECRET = '8MXXKDLy1ZpqygMa'
REDIRECT_URI = 'https://5081-108-28-8-227.ngrok-free.app/callback'

# Token file path
TOKEN_FILE_PATH = 'access_token.json'

@auth_module.route('/')
def home():
    """
    Default route for the auth_module Blueprint.
    Serves the landing page for the Schwab API Authentication service.
    """
    return render_template('auth.html')

# Helper to construct the initial auth URL
@auth_module.route('/authorize')
def authorize():
    auth_url = f"https://api.schwabapi.com/v1/oauth/authorize?client_id={CLIENT_KEY}&redirect_uri={REDIRECT_URI}&scope=read"
    webbrowser.open(auth_url)
    return jsonify({"info": "Authentication URL opened, paste the returned URL here."})

# Helper to generate headers and payload
def construct_headers_and_payload(returned_url):
    response_code = returned_url.split("code=")[1].split("%40")[0] + "@"

    credentials = f"{CLIENT_KEY}:{CLIENT_SECRET}"
    base64_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {base64_credentials}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    payload = {
        "grant_type": "authorization_code",
        "code": response_code,
        "redirect_uri": REDIRECT_URI,
    }

    return headers, payload

# Helper to retrieve tokens
def retrieve_tokens(headers, payload):
    token_response = requests.post(
        url="https://api.schwabapi.com/v1/oauth/token",
        headers=headers,
        data=payload,
    )
    return token_response.json()

# Callback route
@auth_module.route('/callback', methods=['nmPOST'])
def callback():
    returned_url = request.json.get('returned_url')
    if not returned_url:
        return jsonify({"error": "URL not received."}), 400

    headers, payload = construct_headers_and_payload(returned_url)
    token_data = retrieve_tokens(headers, payload)

    # Save token
    with open(TOKEN_FILE_PATH, 'w') as f:
        json.dump(token_data, f)

    return jsonify(token_data)

# Standalone Flask app entry point for one-time authentication
if __name__ == '__main__':
    app = Flask(__name__)
    app.register_blueprint(auth_module)
    app.run(debug=True)