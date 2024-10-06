document.getElementById('financial-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        current_assets: document.getElementById('current_assets').value,
        current_liabilities: document.getElementById('current_liabilities').value,
        inventory: document.getElementById('inventory').value,
        revenue: document.getElementById('revenue').value,
        gross_profit: document.getElementById('gross_profit').value,
        net_income: document.getElementById('net_income').value,
        total_assets: document.getElementById('total_assets').value,
        user_id: 'default_user'
    };

    try {
        // Submit form data to the backend
        const response = await fetch('/financial_statement/input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit data.');
        }

        const result = await response.json();
        console.log("Data successfully submitted:", result);

        // Fetch financial ratios
        const ratiosResponse = await fetch('/financial_statement/ratios?user_id=default_user');
        const ratiosData = await ratiosResponse.json();

        if (ratiosResponse.ok) {
            // Update the UI with the financial ratios
            document.getElementById('ratios').innerHTML = `
                <h3>Financial Ratios:</h3>
                <p>Current Ratio: ${ratiosData.financial_ratios.current_ratio}</p>
                <p>Quick Ratio: ${ratiosData.financial_ratios.quick_ratio}</p>
                <p>Gross Profit Margin: ${ratiosData.financial_ratios.gross_profit_margin}</p>
                <p>Net Profit Margin: ${ratiosData.financial_ratios.net_profit_margin}</p>
                <p>Asset Turnover Ratio: ${ratiosData.financial_ratios.asset_turnover_ratio}</p>
            `;
        } else {
            document.getElementById('ratios').innerHTML = `<p>Error: ${ratiosData.error}</p>`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('ratios').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
