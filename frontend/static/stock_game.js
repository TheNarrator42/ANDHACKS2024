document.getElementById('stock-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the stock symbol from the form
    const symbol = document.getElementById('symbol').value;

    // Make an API request to fetch stock data
    fetch(`/stock_game/live_stock_data?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('stock-result').innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                document.getElementById('stock-result').innerHTML = `
                    <p>Symbol: ${data.symbol}</p>
                    <p>Price: ${data.price}</p>
                    <p>Volume: ${data.volume}</p>
                    <p>Change: ${data.change}%</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('stock-result').innerHTML = '<p>Something went wrong.</p>';
        });
});
