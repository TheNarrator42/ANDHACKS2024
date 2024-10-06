from flask import Blueprint, request, jsonify

financial_instruments_module = Blueprint('financial_instruments_module', __name__)

# Bond pricing calculation
def bond_price(face_value, coupon_rate, periods, market_rate):
    coupon = face_value * coupon_rate
    bond_price_value = sum([coupon / (1 + market_rate) ** i for i in range(1, periods + 1)]) + face_value / (1 + market_rate) ** periods
    return bond_price_value

# Stock pricing using Dividend Discount Model (DDM)
def stock_price(dividend, growth_rate, required_rate_of_return):
    if required_rate_of_return == growth_rate:
        return None  # Cannot divide by zero
    stock_price_value = dividend / (required_rate_of_return - growth_rate)
    return stock_price_value

# Bond pricing endpoint
@financial_instruments_module.route('/bond_pricing', methods=['POST'])
def get_bond_price():
    try:
        data = request.json
        face_value = float(data.get('face_value', 0))
        coupon_rate = float(data.get('coupon_rate', 0)) / 100  # Convert percentage to decimal
        periods = int(data.get('periods', 0))
        market_rate = float(data.get('market_rate', 0)) / 100  # Convert percentage to decimal

        price = bond_price(face_value, coupon_rate, periods, market_rate)
        return jsonify({"bond_price": round(price, 2)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Stock pricing endpoint
@financial_instruments_module.route('/stock_pricing', methods=['POST'])
def get_stock_price():
    try:
        data = request.json
        dividend = float(data.get('dividend', 0))
        growth_rate = float(data.get('growth_rate', 0)) / 100  # Convert percentage to decimal
        required_rate_of_return = float(data.get('required_rate_of_return', 0)) / 100  # Convert percentage to decimal

        price = stock_price(dividend, growth_rate, required_rate_of_return)
        if price is None:
            return jsonify({"error": "Required rate of return cannot be equal to the growth rate."}), 400

        return jsonify({"stock_price": round(price, 2)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
