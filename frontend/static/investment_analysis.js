document.getElementById('investment-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        discount_rate: document.getElementById('discount_rate').value,
        cash_flows: document.getElementById('cash_flows').value.split(',').map(flow => parseFloat(flow.trim()))
    };

    try {
        const response = await fetch('/investment_analysis/investment_analysis', {  // Ensure this matches your Blueprint route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
            document.getElementById('investment_result').innerHTML = `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">NPV: ${result.npv}</li>
                    <li class="list-group-item">IRR: ${result.irr}</li>
                    <li class="list-group-item">Payback Period: ${result.payback_period}</li>
                </ul>
            `;
            document.getElementById('result-card').style.display = "block";
        } else {
            document.getElementById('investment_result').innerHTML = `<p>Error: ${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error calculating investment metrics:', error);
    }
});
