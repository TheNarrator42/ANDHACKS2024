document.getElementById('wacc-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Gather form data
    let debt = document.getElementById('debt').value;
    let equity = document.getElementById('equity').value;
    let cost_of_debt = document.getElementById('cost_of_debt').value;
    let cost_of_equity = document.getElementById('cost_of_equity').value;
    let tax_rate = document.getElementById('tax_rate').value;

    // Prepare data object
    let data = {
        'debt': debt,
        'equity': equity,
        'cost_of_debt': cost_of_debt,
        'cost_of_equity': cost_of_equity,
        'tax_rate': tax_rate
    };

    // Send data to backend using Fetch API
    fetch('/wacc/wacc_calculation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        // Display the result in the 'result' div
        document.getElementById('wacc_value').innerHTML = `<div class="alert alert-success">
            The WACC is: ${result.calculated_wacc}%
        </div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('wacc_value').innerHTML = `<div class="alert alert-danger">
            Error calculating WACC. Please try again.
        </div>`;
    });
});