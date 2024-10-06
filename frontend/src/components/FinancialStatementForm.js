import React, { useState } from 'react';

function FinancialStatementForm() {
  const [formData, setFormData] = useState({
    current_assets: '',
    current_liabilities: '',
    inventory: '',
    revenue: '',
    gross_profit: '',
    net_income: '',
    total_assets: ''
  });

  const [ratios, setRatios] = useState(null);
  const [error, setError] = useState(null); // Error handling state

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Submit form and fetch data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      // Submit financial data to backend (proxy will handle forwarding to Flask)
      const inputResponse = await fetch('/api/financial_statement/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!inputResponse.ok) {
        throw new Error('Failed to submit financial data.');
      }

      const inputData = await inputResponse.json();
      console.log("Data Sent to Backend:", inputData);

      // Fetch calculated ratios from the backend
      const response = await fetch('/api/financial_statement/ratios');
      if (!response.ok) {
        throw new Error('Failed to fetch financial ratios.');
      }

      const responseData = await response.json();
      console.log("Ratios from Backend:", responseData);

      setRatios(responseData.financial_ratios); // Update state with fetched ratios
    } catch (err) {
      console.error('Error submitting data:', err);
      setError(err.message); // Set error message for the user
    }
  };

  return (
    <div>
      <h1>Financial Statement Analysis</h1>
      <form onSubmit={handleSubmit}>
        {['current_assets', 'current_liabilities', 'inventory', 'revenue', 'gross_profit', 'net_income', 'total_assets'].map((field) => (
          <div key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}:</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {ratios && (
        <div>
          <h3>Financial Ratios</h3>
          <p>Current Ratio: {ratios.current_ratio}</p>
          <p>Quick Ratio: {ratios.quick_ratio}</p>
          <p>Gross Profit Margin: {ratios.gross_profit_margin}</p>
          <p>Net Profit Margin: {ratios.net_profit_margin}</p>
          <p>Asset Turnover Ratio: {ratios.asset_turnover_ratio}</p>
        </div>
      )}
    </div>
  );
}

export default FinancialStatementForm;