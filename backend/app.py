from flask import Flask, render_template
from routes.intro_finance import intro_finance_module
from routes.financial_statement import financial_statement_module
from routes.financial_math import financial_math_module
from routes.intro_finance import intro_finance_module
from routes.wacc import wacc_module
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

if __name__ == '__main__':
    app.run(debug=True)