import requests
from requests.auth import HTTPBasicAuth

# SchwabAPI authentication setup
def get_access_token(client_id, client_secret, auth_code, redirect_uri):
    token_url = "https://api.schwab.com/oauth/token"

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
        raise Exception(f"Failed to get access token: {response.status_code}, {response.text}")

# Function to fetch live stock data from SchwabAPI
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
        raise Exception(f"Failed to fetch stock data: {response.status_code}, {response.text}")
