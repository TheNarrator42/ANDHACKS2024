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
        operating_cash_flow: document.getElementById('operating_cash_flow').value,
        capex: document.getElementById('capex').value,
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
            // Industry averages for comparison
            const industryAverages = {
                current_ratio: 1.8,
                quick_ratio: 1.2,
                gross_profit_margin: 0.35,
                net_profit_margin: 0.08,
                asset_turnover_ratio: 0.9,
                cash_flow_margin: 0.1
            };

            // Update the UI with the financial ratios
            document.getElementById('ratios').innerHTML = `
                <h3>Financial Ratios:</h3>
                <p>Current Ratio: ${ratiosData.financial_ratios.current_ratio}</p>
                <p>Quick Ratio: ${ratiosData.financial_ratios.quick_ratio}</p>
                <p>Gross Profit Margin: ${ratiosData.financial_ratios.gross_profit_margin}</p>
                <p>Net Profit Margin: ${ratiosData.financial_ratios.net_profit_margin}</p>
                <p>Asset Turnover Ratio: ${ratiosData.financial_ratios.asset_turnover_ratio}</p>
                <p>Cash Flow Margin: ${ratiosData.financial_ratios.cash_flow_margin}</p>
            `;

            // Create chart with comparison against industry averages
            const ctx = document.getElementById('ratiosChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Current Ratio', 'Quick Ratio', 'Gross Profit Margin', 'Net Profit Margin', 'Asset Turnover Ratio', 'Cash Flow Margin'],
                    datasets: [
                        {
                            label: 'Company Ratios',
                            data: [
                                ratiosData.financial_ratios.current_ratio,
                                ratiosData.financial_ratios.quick_ratio,
                                ratiosData.financial_ratios.gross_profit_margin,
                                ratiosData.financial_ratios.net_profit_margin,
                                ratiosData.financial_ratios.asset_turnover_ratio,
                                ratiosData.financial_ratios.cash_flow_margin
                            ],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Industry Averages',
                            data: [
                                industryAverages.current_ratio,
                                industryAverages.quick_ratio,
                                industryAverages.gross_profit_margin,
                                industryAverages.net_profit_margin,
                                industryAverages.asset_turnover_ratio,
                                industryAverages.cash_flow_margin
                            ],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            document.getElementById('ratios').innerHTML = `<p>Error: ${ratiosData.error}</p>`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('ratios').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
