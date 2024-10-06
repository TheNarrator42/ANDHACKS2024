from flask import Flask, render_template
from routes.intro_finance import intro_finance_module
from routes.financial_statement import financial_statement_module
from routes.financial_math import financial_math_module
from routes.intro_finance import intro_finance_module
from routes.wacc import wacc_module
from routes.financial_instruments import financial_instruments_module
from routes.risk_return import risk_return_module
from routes.investment_analysis import investment_analysis_module
import os

# Path to the frontend folder
frontend_folder = os.path.abspath('../frontend')

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


# Landing page route
@app.route('/')
def landing_page():
    return render_template('landing.html')

# Serve the Financial Statement Analysis form
@app.route('/financial_statement_form')
def financial_statement_form():
    return render_template('financial_statement_form.html')

# Serve the Financial Math form
@app.route('/financial_math_form')
def financial_math_form():
    return render_template('financial_math_form.html')

# Serve the Intro to Finance form
@app.route('/intro_finance_form')
def intro_finance_form():
    return render_template('intro_finance_form.html')

@app.route('/financial_instruments_form')
def financial_instruments_form():
    return render_template('financial_instruments_form.html')

@app.route('/risk_return_form')
def risk_return_form():
    return render_template('risk_return_form.html')

@app.route('/investment_analysis_form')
def investment_analysis_form():
    return render_template('investment_analysis_form.html')

if __name__ == '__main__':
    app.run(debug=True)