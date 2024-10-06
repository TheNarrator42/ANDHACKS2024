// Bond Pricing Form Submission
document.getElementById('bond-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const bondData = {
        face_value: document.getElementById('face_value').value,
        coupon_rate: document.getElementById('coupon_rate').value,
        periods: document.getElementById('periods').value,
        market_rate: document.getElementById('market_rate').value
    };

    try {
        const response = await fetch('/financial_instruments/bond_pricing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bondData)
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('bond_result').innerHTML = `<h2>Bond Price: $${result.bond_price}</h2>`;
            document.getElementById('bond-result-card').style.display = "block";
        } else {
            document.getElementById('bond_result').innerHTML = `<p>Error: ${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error calculating bond price:', error);
    }
});

// Stock Pricing Form Submission
document.getElementById('stock-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const stockData = {
        dividend: document.getElementById('dividend').value,
        growth_rate: document.getElementById('growth_rate').value,
        required_rate_of_return: document.getElementById('required_rate_of_return').value
    };

    try {
        const response = await fetch('/financial_instruments/stock_pricing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stockData)
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('stock_result').innerHTML = `<h2>Stock Price: $${result.stock_price}</h2>`;
            document.getElementById('stock-result-card').style.display = "block";
        } else {
            document.getElementById('stock_result').innerHTML = `<p>Error: ${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error calculating stock price:', error);
    }
});
