document.getElementById('financial-math-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        principal: document.getElementById('principal').value,
        rate: document.getElementById('rate').value,
        time: document.getElementById('time').value,
        calculation_type: document.getElementById('calculation-type').value
    };

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
        document.getElementById('result').innerHTML = `<p>Result: ${result.result.toFixed(2)}</p>`;
    } catch (error) {
        console.error('Error calculating financial math:', error);
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
