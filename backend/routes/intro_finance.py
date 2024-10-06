from flask import Blueprint, jsonify

# Blueprint
intro_finance_module = Blueprint('intro_finance_module', __name__)

#Dummy data for module
finance_data = {
    "objectives":[
        "Maximize shareholder wealth", 
        "Manage the firm's financial resources",
        "Analyze financial statements to make investment "
    ],
    "roles_of_financial_managers": [
        "Investment decisions (capital budgeting)",
        "Financing decisions (capital structure)",
        "Dividend decisions (dividend policy)"
    ],
    "divisions_of_finance": {
        "corporate_finance": "Managing company finances, making investments and capital budgeting decisions",
        "investments": "Managing securities portfolios, assessing risk and return",
        "markets_institutions": "Overseeing financial markets and institutions that facilitate flow of funds"
    }
}

# Route to get objectives
@intro_finance_module.route('/objectives', methods=['GET'])
def get_objectives():
    return jsonify({"objectives": finance_data['objectives']}), 200

# Route to get roles of financial managers
@intro_finance_module.route('/roles', methods=['GET'])
def get_roles():
    return jsonify({"roles_of_financial_managers": finance_data['roles_of_financial_managers']}), 200

# Route to get divisions of finance
@intro_finance_module.route('/divisions', methods=['GET'])
def get_divisions():
    return jsonify({"divisions": finance_data['divisions_of_finance']}), 200