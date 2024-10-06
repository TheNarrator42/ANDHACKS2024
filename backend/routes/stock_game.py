import json
import os
import requests
from flask import Blueprint, jsonify, request

stock_game_module = Blueprint('stock_game_module', __name__)

# Token file path
TOKEN_FILE_PATH = 'access_token.json'

# Helper function to load the access token from a file
def load_access_token():
    if os.path.exists(TOKEN_FILE_PATH):
        with open(TOKEN_FILE_PATH, 'r') as f:
            token_data = json.load(f)
            return token_data.get('access_token')
    return None

@stock_game_module.route('/live_stock_data', methods=['GET'])
def get_live_stock_data():
    # Simulate mode, set to True during maintenance or testing
    simulate = request.args.get('simulate', 'false').lower() == 'true'
    
    if simulate:
        # Return mock data if simulation mode is on
        mock_data = {
            "symbol": "AAPL",
            "price": 150.25,
            "volume": 54000000,
            "change": -0.35
        }
        return jsonify(mock_data), 200

    symbol = request.args.get('symbol')
    access_token = load_access_token()

    if not access_token:
        return jsonify({"error": "Access token not available. Please authorize first."}), 401

    stock_url = "https://api.schwab.com/v1/market/quotes"

    # Fetch stock data using the access token
    response = requests.get(
        stock_url,
        headers={"Authorization": f"Bearer {access_token}"},
        params={"symbol": symbol}
    )

    if response.status_code == 200:
        stock_data = response.json()
        return jsonify({
            "symbol": symbol,
            "price": stock_data['price'],
            "volume": stock_data['volume'],
            "change": stock_data['changePercent']
        })
    else:
        return jsonify({"error": f"Error fetching stock data: {response.status_code}"}), 500
