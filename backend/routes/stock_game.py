from flask import Blueprint, jsonify, request
from api.schwab_api import fetch_live_stock_data  # Import API helper function

stock_game_module = Blueprint('stock_game_module', __name__)

# Endpoint to fetch live stock data
@stock_game_module.route('/live_stock_data', methods=['GET'])
def get_live_stock_data():
    symbol = request.args.get('symbol')
    
    # Get the access token securely (use environment variables in production)
    access_token = 'your_access_token'
    
    # Fetch live stock data from SchwabAPI
    stock_data = fetch_live_stock_data(access_token, symbol)
    
    # Return the stock data to the frontend
    return jsonify({
        "symbol": symbol,
        "price": stock_data['price'],
        "volume": stock_data['volume'],
        "change": stock_data['changePercent']
    })
