import json
import os
import requests
from flask import Blueprint, jsonify, request
from routes.black_scholes import black_scholes

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

# Simulate mode, set to True during maintenance or testing
simulate = True
# Folder of the simulated stock data
data_directory = "data/"

# Helper function to read the simulated stock data
def read_simulated_data(symbol):
    prices = []
    metadata = {}
    file_path = os.path.join(data_directory, f"{symbol}.txt")

    with open(file_path, 'r') as file:
        section = None
        for line in file:
            line = line.strip()
            # Skip empty lines and comments
            if not line or line.startswith('#'):
                if line.startswith("# Prices"):
                    section = 'prices'
                elif line.startswith("# Metadata"):
                    section = 'metadata'
                continue

            if section == 'prices':
                prices.extend([float(price) for price in line.split(',') if price])
            elif section == 'metadata':
                key, value = line.split(':')
                metadata[key.strip()] = float(value.strip())
    
    return prices, metadata

@stock_game_module.route('/live_stock_data', methods=['GET'])
def get_live_stock_data():
    # Return mock (local) data if simulation mode is on
    if simulate:
        # Get the stock symbol from query parameters
        symbol = request.args.get('symbol', '').upper() #Normalize tickers to uppercase
        valid_symbols = ['TSLA', 'PG', 'AMC']

        if symbol in valid_symbols:
            prices, metadata = read_simulated_data(symbol)
            return jsonify({
                "symbol": symbol,
                "prices": prices,
                "r": metadata["Risk-Free Rate"],
                "sigma": metadata["Volatility"]
            }), 200
        else:
            return jsonify({"error": f"No simulated data available for {symbol}"}), 404

    # Fetch real data from (Schwab) API if simulation mode is off
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
    
@stock_game_module.route('/risk_reward_grid', methods=['GET'])
def risk_reward_grid():
    try:
        # Get query parameters with defaults (split in 2 steps for readability)
        stock_price = request.args.get('stockPrice')
        risk_free_rate = request.args.get('riskFreeRate')
        volatility = request.args.get('volatility')

        # convert query parameters to float
        S = float(stock_price)  # Stock price
        r = float(risk_free_rate)  # Risk-free rate
        sigma = float(volatility)  # Volatility

        # Define expiration times and strike prices
        T_values = [0.1, 0.2, 0.5, 1.0]  # Expiration times in years
        K_values = [round(S * 0.9, 2), round(S, 2), round(S * 1.1, 2)]  # Strike prices, rounded for display

        # Create the grid structure
        grid = []
        for K in K_values:
            row = []  # One row per strike price
            for T in T_values:
                # Calculate call and put prices using Black-Scholes
                call_price = black_scholes(S, K, T, r, sigma, 'call')
                put_price = black_scholes(S, K, T, r, sigma, 'put')

                # Add the cell with required fields
                row.append({
                    'strike': K,
                    'expiration': T,
                    'call': round(call_price, 2),
                    'put': round(put_price, 2)
                })
            grid.append(row)

        # Return the grid as JSON
        return jsonify(grid), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400