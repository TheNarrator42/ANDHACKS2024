from flask import Flask, render_template
from routes.financial_statement import financial_statement_module
from routes.intro_finance import intro_finance_module
import os

# Path to the frontend folder
frontend_folder = os.path.abspath('../frontend')

# Initialize Flask app with template and static folder paths
app = Flask(__name__,
            template_folder=os.path.join(frontend_folder, 'templates'),
            static_folder=os.path.join(frontend_folder, 'static'))

# Register blueprints (modules in routes folder)
app.register_blueprint(financial_statement_module, url_prefix='/financial_statement')
app.register_blueprint(intro_finance_module, url_prefix='/intro_finance')

# Serve the HTML form
@app.route('/')
def financial_form():
    return render_template('financial_form.html')

if __name__ == '__main__':
    app.run(debug=True)
