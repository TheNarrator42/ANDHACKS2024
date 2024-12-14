import math
from scipy.stats import norm

def black_scholes(S, K, T, R, sigma, option_type):
    d1 = (math.log(S / K) + (R + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)

    if option_type == 'call':
        option_price = S * norm.cdf(d1) - K * math.exp(-R * T) * norm.cdf(d2)
    elif option_type == 'put':
        option_price = K * math.exp(-R * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    else:
        raise ValueError('Option type must be either "call" or "put"')
    
    return option_price