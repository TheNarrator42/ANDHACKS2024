from flask import Blueprint, jsonify, render_template, request

# Define a Blueprint
wacc_module = Blueprint('wacc_module', __name__)

@wacc_module.route('/wacc_form', methods=['GET'])
def wacc_form():
    """
    Get divisions of finance (WACC related data)
    """
    return render_template('wacc_form.html')

@wacc_module.route('/wacc_calculation', methods=['POST'])
def get_wacc():
    """
    Calculating WACC using wacc function
    """
    try:
        user_data = request.json  # Get JSON data from the form

        # Convert string inputs to floats for calculation
        debt = float(user_data.get('debt', 0))
        equity  = float(user_data.get('equity', 1))
        cost_of_debt = float(user_data.get('cost_of_debt', 0))
        cost_of_equity = float(user_data.get('cost_of_equity', 1))
        tax_rate = float(user_data.get('tax_rate', 1))

        wacc_value = wacc(debt, equity, cost_of_debt, cost_of_equity, tax_rate)

        # Send success response
        return jsonify({"calculated_wacc": round(wacc_value, 4)}), 200
    except ValueError as e:
        return jsonify({"error": "Invalid input. Please provide numeric values only."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def wacc(debt, equity, cost_of_debt, cost_of_equity, tax_rate):
    total_value = debt + equity
    wacc_value = (debt / total_value) * cost_of_debt * (1 - tax_rate) + (equity / total_value) * cost_of_equity
    return wacc_value