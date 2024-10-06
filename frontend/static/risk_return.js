document.getElementById('capm-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        risk_free_rate: document.getElementById('risk_free_rate').value,
        beta: document.getElementById('beta').value,
        market_return: document.getElementById('market_return').value
    };

    try {
        const response = await fetch('/risk_return/capm_calculation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('capm_result').innerHTML = `<p>Required Rate of Return: ${result.required_rate_of_return}%</p>`;
            updateRiskReturnGraph(formData.beta, result.required_rate_of_return);
        } else {
            document.getElementById('capm_result').innerHTML = `<p>Error: ${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error calculating CAPM:', error);
    }
});

// Function to update the risk-return graph
function updateRiskReturnGraph(beta, requiredReturn) {
    const ctx = document.getElementById('risk_return_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', '1', '2', '3', '4', '5'], // Example beta values for x-axis
            datasets: [{
                label: 'Required Return (%)',
                data: [2, 4, 6, 8, 10, requiredReturn], // Example risk-return data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Beta'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Required Return (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
