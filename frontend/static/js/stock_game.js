// ==================== GLOBAL VARIABLES ====================
let stockPrices = [];
let currentIndex = 0;
let netProfit = 0;
let shares = 0;
let stockPrice = 0;
let riskFreeRate = 0;
let volatility = 0;
let timer;

// ==================== Pre Game Setup ====================
document.addEventListener('DOMContentLoaded', () => { //render the empty table on page load
    updateRiskRewardTable(); // Render the empty risk-reward table on page load
});

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
            stockPrices = result.prices;
            riskFreeRate = result.r;
            volatility = result.sigma;
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
    await fetchStockData(); // Fetch stock data from the backend

    if (stockPrices.length === 0) {
        alert('No stock data available. Please check backend.');
        return;
    }

    currentIndex = 0;
    netProfit = 0;
    shares = 0;
    stockChart.data.labels = [];
    stockChart.data.datasets[0].data = [];
    updateNetProfit();

    await fetchRiskRewardGrid(stockPrices[currentIndex], riskFreeRate, volatility); // Populate table with real data

    timer = setInterval(function () {
        if (currentIndex < stockPrices.length) {
            stockPrice = stockPrices[currentIndex];
            updateStockChart(stockPrice); // Update stock chart
            fetchRiskRewardGrid(stockPrice, riskFreeRate, volatility); // Update risk-reward table
            currentIndex++;
        } else {
            clearInterval(timer);
            alert(`Game over! Your final profit is $${netProfit.toFixed(2)}`);
        }
    }, 1000);
}

function updateStockChart(stockPrice) {

    stockChart.data.labels.push(`Day ${currentIndex + 1}`);
    stockChart.data.datasets[0].data.push(stockPrice);
    stockChart.update();
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

// ==================== RISK-REWARD TABLE ====================
function fetchRiskRewardGrid(stockPrice, riskFreeRate, volatility) {
    console.log("Parameters sent:", { stockPrice, riskFreeRate, volatility });
    fetch(`/stock_game/risk_reward_grid?stockPrice=${stockPrice}&riskFreeRate=${riskFreeRate}&volatility=${volatility}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => updateRiskRewardTable(data)) // Render the updated table
        .catch(error => console.error('Error fetching risk/reward data:', error));
}

function updateRiskRewardTable(grid = []) {
    const container = document.getElementById('risk-reward-table');
    if (!container) return; // Safeguard: Stop if the container is not found

    // Clear existing content
    container.innerHTML = '';

    // Create table element
    const table = document.createElement('table');
    table.className = 'risk-reward-table';

    // Define expiration times (T values) for header row
    const T_values = ['T=0.1', 'T=0.2', 'T=0.5', 'T=1'];
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Strike</th>' + 
        T_values.map(t => `<th>${t}</th>`).join('');
    table.appendChild(headerRow);

    // Render placeholders or data rows based on the input grid
    if (grid.length === 0) {
        renderEmptyRows(table, T_values.length, 3); // Render 3 placeholder rows
    } else {
        renderDataRows(table, grid);
    }

    container.appendChild(table); // Append the table to the container
}

// Helper function to render empty rows
function renderEmptyRows(table, numCols, numRows) {
    for (let i = 0; i < numRows; i++) {
        const dataRow = document.createElement('tr');
        dataRow.innerHTML = `<td>--</td>` + 
            Array(numCols).fill(`<td>-- / --</td>`).join(''); // Placeholder "-- / --"
        table.appendChild(dataRow); // Append each row to the table
    }
}


// Helper function to render rows with actual data
function renderDataRows(table, grid) {
    grid.forEach(row => {
        const dataRow = document.createElement('tr');
        dataRow.innerHTML = `<td>${row[0].strike}</td>` +
            row.map(cell => `<td>${cell.call.toFixed(2)} / ${cell.put.toFixed(2)}</td>`).join('');
        table.appendChild(dataRow);
    });
}


