from flask import Blueprint, request, jsonify

risk_return_module = Blueprint('risk_return_module', __name__)

# CAPM calculation function
def capm(risk_free_rate, beta, market_return):
    return risk_free_rate + beta * (market_return - risk_free_rate)

# CAPM endpoint
@risk_return_module.route('/capm_calculation', methods=['POST'])
def get_capm():
    try:
        data = request.json
        risk_free_rate = float(data.get('risk_free_rate', 0)) / 100  # Convert from percentage to decimal
        beta = float(data.get('beta', 0))
        market_return = float(data.get('market_return', 0)) / 100  # Convert from percentage to decimal

        # Calculate CAPM
        required_rate_of_return = capm(risk_free_rate, beta, market_return)

        # Return result as percentage
        return jsonify({"required_rate_of_return": round(required_rate_of_return * 100, 2)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
