from flask import Blueprint, jsonify, render_template, request

# Define a Blueprint
wacc_module = Blueprint('wacc_module', __name__)

@wacc_module.route('/wacc_form', methods=['GET'])
def wacc_form():
    """
    Renders the WACC form
    """
    return render_template('wacc_form.html')

@wacc_module.route('/wacc_calculation', methods=['POST'])
def get_wacc():
    """
    Calculating WACC using the provided formula
    """
    try:
        user_data = request.json  # Get JSON data from the form

        # Convert string inputs to floats for calculation
        debt = float(user_data.get('debt', 0))  # Default to 0 if missing
        equity = float(user_data.get('equity', 1))  # Default to 1 to avoid division by 0
        cost_of_debt = float(user_data.get('cost_of_debt', 0))  # Default to 0
        cost_of_equity = float(user_data.get('cost_of_equity', 0))  # Default to 0
        tax_rate = float(user_data.get('tax_rate', 0)) / 100  # Convert from percentage to decimal

        # Validate inputs
        if equity == 0:
            return jsonify({"error": "Equity cannot be zero."}), 400

        # Calculate WACC
        wacc_value = wacc(debt, equity, cost_of_debt, cost_of_equity, tax_rate)

        # Send success response
        return jsonify({"calculated_wacc": round(wacc_value, 2)}), 200  # Return WACC as a percentage

    except ValueError as e:
        return jsonify({"error": "Invalid input. Please provide numeric values only."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def wacc(debt, equity, cost_of_debt, cost_of_equity, tax_rate):
    total_value = debt + equity
    debt_ratio = debt / total_value if total_value != 0 else 0
    equity_ratio = equity / total_value if total_value != 0 else 0

    # Calculate WACC using the correct formula
    wacc_value = (debt_ratio * cost_of_debt * (1 - tax_rate)) + (equity_ratio * cost_of_equity)
    return wacc_value
