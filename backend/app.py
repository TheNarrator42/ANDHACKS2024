from flask import Flask, render_template, request, redirect
from routes.intro_finance import intro_finance_module
from routes.financial_statement import financial_statement_module
from routes.financial_math import financial_math_module
from routes.wacc import wacc_module
from routes.financial_instruments import financial_instruments_module
from routes.risk_return import risk_return_module
from routes.investment_analysis import investment_analysis_module
from api.auth import auth_module  # Import the auth_module correctly from the api folder
from routes.stock_game import stock_game_module  # Stock game module integrated
import os
import json

# Path to the frontend folder (set relative path)
frontend_folder = os.path.abspath('../WM2024/frontend')

# Initialize Flask app with template and static folder paths
app = Flask(__name__,
            template_folder=os.path.join(frontend_folder, 'templates'),
            static_folder=os.path.join(frontend_folder, 'static'))

# Register blueprints (modules in routes folder)
app.register_blueprint(intro_finance_module, url_prefix='/intro_finance')
app.register_blueprint(financial_statement_module, url_prefix='/financial_statement')
app.register_blueprint(financial_math_module, url_prefix='/financial_math')
app.register_blueprint(wacc_module, url_prefix='/wacc')
app.register_blueprint(financial_instruments_module, url_prefix='/financial_instruments')
app.register_blueprint(risk_return_module, url_prefix='/risk_return')
app.register_blueprint(investment_analysis_module, url_prefix='/investment_analysis')
app.register_blueprint(auth_module, url_prefix='/auth')  # Register the auth_module with /auth prefix
app.register_blueprint(stock_game_module, url_prefix='/stock_game')  # Stock game route handled by the same app

# Token file path (assuming you're storing the access token in a file for simplicity)
TOKEN_FILE_PATH = 'access_token.json'

# Helper function to load the access token from a file
def load_access_token():
    if os.path.exists(TOKEN_FILE_PATH):
        with open(TOKEN_FILE_PATH, 'r') as f:
            token_data = json.load(f)
            return token_data.get('access_token')
    return None

# Landing page route (Main entry point)
@app.route('/')
def landing_page():
    return render_template('landing.html')  # Your landing page with options for tutorial or stock game

# Tutorial page route (links to modules)
@app.route('/tutorial')
def tutorial():
    return render_template('tutorial.html')  # Links to all the modules

# Financial Statement Form
@app.route('/financial_statement_form')
def financial_statement_form():
    return render_template('financial_statement_form.html')

# Financial Math Form
@app.route('/financial_math_form')
def financial_math_form():
    return render_template('financial_math_form.html')

# Intro to Finance Form
@app.route('/intro_finance_form')
def intro_finance_form():
    return render_template('intro_finance_form.html')

# Financial Instruments Form
@app.route('/financial_instruments_form')
def financial_instruments_form():
    return render_template('financial_instruments_form.html')

# Risk and Return Form
@app.route('/risk_return_form')
def risk_return_form():
    return render_template('risk_return_form.html')

# Risk and Return Form
@app.route('/wacc/wacc_form')
def wacc_form():
    return render_template('wacc_form.html')

# Investment Analysis Form
@app.route('/investment_analysis_form')
def investment_analysis_form():
    return render_template('investment_analysis_form.html')

# Stock Game Form (connects stock_game.py logic to the same app)
@app.route('/stock_game')
def stock_game():
    return render_template('stock_game_form.html')  # HTML form for the stock game

# Add the callback route for Schwab API OAuth2 (handled by auth.py)
@app.route('/auth/callback')
def callback():
    # Delegating this to the auth_module
    return redirect('/auth/callback')

if __name__ == '__main__':
    app.run(debug=True)