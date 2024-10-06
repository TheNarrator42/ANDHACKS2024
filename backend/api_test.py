import requests
from requests.auth import HTTPBasicAuth

# Replace these with your actual credentials
client_id = 'your_client_id'        # Your Schwab app key
client_secret = 'your_client_secret'
auth_code = 'your_auth_code'        # You get this from OAuth flow
redirect_uri = 'your_redirect_uri'  # Your app's registered redirect URI

# OAuth token request URL
token_url = "https://api.schwab.com/oauth/token"

# Request access token
def get_access_token():
    response = requests.post(
        token_url,
        auth=HTTPBasicAuth(client_id, client_secret),
        data={
            'grant_type': 'authorization_code',
            'code': auth_code,
            'redirect_uri': redirect_uri
        }
    )

    if response.status_code == 200:
        tokens = response.json()
        return tokens['access_token']
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Fetch live stock data for a specific stock symbol
def fetch_live_stock_data(access_token, symbol):
    stock_url = "https://api.schwab.com/v1/market/quotes"
    
    response = requests.get(
        stock_url,
        headers={"Authorization": f"Bearer {access_token}"},
        params={"symbol": symbol}
    )

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching stock data: {response.status_code}, {response.text}")
        return None

# Test API functionality
if __name__ == '__main__':
    access_token = get_access_token()
    
    if access_token:
        stock_symbol = 'AAPL'  # Example stock symbol for Apple
        stock_data = fetch_live_stock_data(access_token, stock_symbol)

        if stock_data:
            print(f"Live Stock Data for {stock_symbol}: {stock_data}")
