document.getElementById('financial-math-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        principal: document.getElementById('principal').value,
        rate: document.getElementById('rate').value,
        time: document.getElementById('time').value,
        calculation_type: document.getElementById('calculation-type').value
    };

    // Add payment for annuity calculations
    if (formData.calculation_type === 'future_value_annuity' || formData.calculation_type === 'present_value_annuity') {
        formData.payment = document.getElementById('payment').value;
    }

    // Add compounding frequency for compound interest
    if (formData.calculation_type === 'compound_interest') {
        formData.compounding_frequency = document.getElementById('compounding_frequency').value;
    }

    try {
        const response = await fetch('/financial_math/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to calculate financial math.');
        }

        const result = await response.json();
        document.getElementById('result').innerHTML = `<h2>Result: $${result.result.toFixed(2)}</h2>`;
        document.getElementById('result').style.display = "block";
    } catch (error) {
        console.error('Error calculating financial math:', error);
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Show/hide input fields based on calculation type
document.getElementById('calculation-type').addEventListener('change', function() {
    const calcType = this.value;

    // Show payment field for annuity calculations
    if (calcType === 'future_value_annuity' || calcType === 'present_value_annuity') {
        document.getElementById('payment-field').style.display = 'block';
    } else {
        document.getElementById('payment-field').style.display = 'none';
    }

    // Show compounding frequency for compound interest
    if (calcType === 'compound_interest') {
        document.getElementById('compounding-field').style.display = 'block';
    } else {
        document.getElementById('compounding-field').style.display = 'none';
    }
});
