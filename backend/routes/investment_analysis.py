from flask import Blueprint, request, jsonify
import numpy as np

investment_analysis_module = Blueprint('investment_analysis_module', __name__)

# NPV calculation function
def npv(discount_rate, cash_flows):
    return sum([cf / (1 + discount_rate) ** i for i, cf in enumerate(cash_flows)])

# Custom IRR calculation using Newton-Raphson method
def custom_irr(cash_flows, guess=0.15, tolerance=1e-6, max_iterations=1000):
    def npv(rate):
        return sum([cf / (1 + rate) ** i for i, cf in enumerate(cash_flows)])

    for i in range(max_iterations):
        npv_value = npv(guess)
        npv_derivative = sum([-i * cf / (1 + guess) ** (i + 1) for i, cf in enumerate(cash_flows)])

        print(f"Iteration {i}: Guess = {guess}, NPV = {npv_value}, NPV Derivative = {npv_derivative}")  # Debugging
        
        if npv_derivative == 0:
            return None
        
        new_guess = guess - npv_value / npv_derivative
        if abs(new_guess - guess) < tolerance:
            print(f"Converged at iteration {i} with IRR: {new_guess}")  # Debugging
            return new_guess
        
        guess = new_guess
    
    print("IRR did not converge")  # Debugging
    return None

# Payback period calculation function
def payback_period(cash_flows):
    cumulative_cash_flow = 0
    for i, cash_flow in enumerate(cash_flows):
        cumulative_cash_flow += cash_flow
        if cumulative_cash_flow >= 0:
            return i
    return None

# Endpoint to calculate NPV, IRR, and Payback Period
@investment_analysis_module.route('/investment_analysis', methods=['POST'])
def investment_analysis():
    try:
        data = request.json
        discount_rate = float(data.get('discount_rate', 0)) / 100
        cash_flows = list(map(float, data.get('cash_flows', [])))

        # Calculate NPV
        calculated_npv = npv(discount_rate, cash_flows)

        # Calculate custom IRR
        calculated_irr = custom_irr(cash_flows)

        # Calculate Payback Period
        calculated_payback_period = payback_period(cash_flows)

        return jsonify({
            "npv": round(calculated_npv, 2),
            "irr": round(calculated_irr * 100, 2) if calculated_irr is not None else None,
            "payback_period": calculated_payback_period
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500