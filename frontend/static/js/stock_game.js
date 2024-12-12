// ==================== GLOBAL VARIABLES ====================
let stockData = [];
let currentIndex = 0;
let netProfit = 0;
let shares = 0;
let stockPrice = 0;
let timer;

// ==================== CHART INITIALIZATION ====================
const ctx = document.getElementById('stockChart').getContext('2d');
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Price',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Day' } },
            y: { title: { display: true, text: 'Price ($)' } }
        }
    }
});

// ==================== FORM HANDLING ====================
document.getElementById('ticker-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    startGame();
});

// ==================== GAME LOGIC ====================

// Fetch data from Flask backend
async function fetchStockData() {
    const symbol = document.getElementById('ticker').value.toUpperCase(); // Get user input
    const stockResult = document.getElementById('stock-result');

    try{
        //Fetch stock data from the backend
        const response = await fetch(`/stock_game/live_stock_data?symbol=${symbol}`);
        const result = await response.json();

        if (response.ok){
            //Display stock data if available
            stockResult.innerHTML = `<p>Symbol: ${result.symbol}</p>`;
            stockData = result.data;
        }
        else{
            //Display error message if stock data if no data is found
            stockResult.innerHTML = `<p>Error: ${result.error}</p>`;
        }
    } catch (error){
        console.error('Error:', error);
        stockResult.innerHTML = '<p>Something went wrong fetching stock data.</p>';
    }
}

async function startGame() {
    await fetchStockData(); // Ensure data is loaded before starting

    if (stockData.length === 0) {
        alert('No stock data available. Please check backend.');
        return;
    }

    currentIndex = 0;
    netProfit = 0;
    shares = 0;
    stockChart.data.labels = [];
    stockChart.data.datasets[0].data = [];
    updateNetProfit();

    timer = setInterval(function() {
        if (currentIndex < stockData.length) {
            updateStockChart();
        } else {
            clearInterval(timer);
            alert(`Game over! Your final profit is $${netProfit.toFixed(2)}`);
        }
    }, 1000); // Update every 1 second
}

function updateStockChart() {
    stockPrice = stockData[currentIndex];
    stockChart.data.labels.push(`Day ${currentIndex + 1}`);
    stockChart.data.datasets[0].data.push(stockPrice);
    stockChart.update();
    currentIndex++;
}

function updateNetProfit() {
    document.getElementById('net-profit').innerText = `Net Profit: $${netProfit.toFixed(2)}`;
}

document.getElementById('buy-btn').addEventListener('click', function() {
    const numShares = parseInt(document.getElementById('shares').value);
    shares += numShares;
    netProfit -= stockPrice * numShares; // Buy reduces net profit
    updateNetProfit();
});

document.getElementById('sell-btn').addEventListener('click', function() {
    const numShares = parseInt(document.getElementById('shares').value);
    if (shares >= numShares && numShares > 0) {  // Ensure valid sell
        shares -= numShares;
        netProfit += stockPrice * numShares; // Sell increases net profit
        updateNetProfit();
    }
});

// ==================== API INTERACTIONS ====================
document.getElementById('stock-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch stock data
    const symbol = document.getElementById('symbol').value;
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

// ==================== RISK-REWARD TABLE ====================
function fetchRiskRewardGrid() {
    fetch('/risk_reward_grid')
      .then(response => response.json())
      .then(data => renderRiskRewardTable(data))
      .catch(error => console.error('Error fetching risk/reward data:', error));
}

function renderRiskRewardTable(grid) {
    const container = document.getElementById('risk-reward-table');
    container.innerHTML = ''; // Clear existing content

    const table = document.createElement('table');
    table.className = 'risk-reward-table';

    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Strike</th>' + grid[0].map(cell => `<th>T=${cell.expiration}</th>`).join('');
    table.appendChild(headerRow);

    // Create data rows
    grid.forEach(row => {
        const dataRow = document.createElement('tr');
        dataRow.innerHTML = `<td>${row[0].strike}</td>` + 
                            row.map(cell => `<td>${cell.call.toFixed(2)} / ${cell.put.toFixed(2)}</td>`).join('');
        table.appendChild(dataRow);
    });

    container.appendChild(table);
}

// Fetch the table when the page loads
document.addEventListener('DOMContentLoaded', fetchRiskRewardGrid);
