from flask import Blueprint, request, jsonify

financial_math_module = Blueprint('financial_math_module', __name__)

# Future Value Calculation
def future_value(principal, rate, time):
    return principal * (1 + rate) ** time

# Present Value Calculation
def present_value(future_value, rate, time):
    return future_value / (1 + rate) ** time

# Compound Interest Calculation
def compound_interest(principal, rate, time, compounding_frequency):
    return principal * (1 + rate / compounding_frequency) ** (compounding_frequency * time)

# Future Value of an Ordinary Annuity
def future_value_annuity(payment, rate, time):
    return payment * ((1 + rate) ** time - 1) / rate

# Present Value of an Ordinary Annuity
def present_value_annuity(payment, rate, time):
    return payment * (1 - (1 + rate) ** -time) / rate

# Route to handle financial math calculations
@financial_math_module.route('/calculate', methods=['POST'])
def calculate_financial_math():
    data = request.json
    principal = float(data.get('principal', 0))
    rate = float(data.get('rate', 0)) / 100  # Convert percentage to decimal
    time = float(data.get('time', 0))
    calculation_type = data.get('calculation_type')
    
    result = None

    if calculation_type == 'future_value':
        result = future_value(principal, rate, time)
    elif calculation_type == 'present_value':
        # Assume future value is equal to principal for simplicity in this example
        result = present_value(principal, rate, time)
    elif calculation_type == 'compound_interest':
        compounding_frequency = int(data.get('compounding_frequency', 1))  # Times compounded per year
        result = compound_interest(principal, rate, time, compounding_frequency)
    elif calculation_type == 'future_value_annuity':
        payment = float(data.get('payment', 0))  # Payment amount per period
        result = future_value_annuity(payment, rate, time)
    elif calculation_type == 'present_value_annuity':
        payment = float(data.get('payment', 0))  # Payment amount per period
        result = present_value_annuity(payment, rate, time)
    else:
        return jsonify({"error": "Invalid calculation type"}), 400

    return jsonify({"result": result}), 200
