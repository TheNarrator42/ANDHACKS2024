from flask import Blueprint, request, jsonify

financial_statement_module = Blueprint('financial_statement_module', __name__)

# In-memory storage for demo purposes
financial_data = {}

# Endpoint to input financial data (from form submission)
@financial_statement_module.route('/input', methods=['POST'])
def input_financial_data():
    try:
        user_data = request.json  # Get JSON data from the form

        # Convert string inputs to floats for calculation
        user_data['current_assets'] = float(user_data.get('current_assets', 0))
        user_data['current_liabilities'] = float(user_data.get('current_liabilities', 1))
        user_data['inventory'] = float(user_data.get('inventory', 0))
        user_data['revenue'] = float(user_data.get('revenue', 1))
        user_data['gross_profit'] = float(user_data.get('gross_profit', 1))
        user_data['net_income'] = float(user_data.get('net_income', 1))
        user_data['total_assets'] = float(user_data.get('total_assets', 1))

        user_id = user_data.get('user_id', 'default_user')  # Assign a default user ID

        # Save data
        financial_data[user_id] = user_data

        # Send success response
        return jsonify({"message": "Data saved successfully"}), 200
    except ValueError as e:
        return jsonify({"error": "Invalid input. Please provide numeric values only."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to calculate and return financial ratios
@financial_statement_module.route('/ratios', methods=['GET'])
def get_financial_ratios():
    try:
        user_id = request.args.get('user_id', 'default_user')

        # Ensure we have data for the user
        if user_id not in financial_data:
            return jsonify({"error": "User data not found"}), 404

        data = financial_data[user_id]
        
        # Calculate ratios safely
        current_ratio = data['current_assets'] / data['current_liabilities']
        quick_ratio = (data['current_assets'] - data['inventory']) / data['current_liabilities']
        gross_profit_margin = data['gross_profit'] / data['revenue']
        net_profit_margin = data['net_income'] / data['revenue']
        asset_turnover_ratio = data['revenue'] / data['total_assets']

        ratios = {
            "current_ratio": current_ratio,
            "quick_ratio": quick_ratio,
            "gross_profit_margin": gross_profit_margin,
            "net_profit_margin": net_profit_margin,
            "asset_turnover_ratio": asset_turnover_ratio
        }

        return jsonify({"financial_ratios": ratios}), 200
    except ZeroDivisionError:
        return jsonify({"error": "Division by zero encountered in financial ratios"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
