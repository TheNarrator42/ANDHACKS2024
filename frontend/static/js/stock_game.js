// ==================== CONSTANTS AND GLOBAL VARIABLES ====================
const fakeData = [
    196.13, 194.00, 192.29, 200.42, 200.52, 183.05, 174.35, 175.45, 173.05, 163.16, 
    172.36, 176.39, 168.76, 181.41, 176.17, 164.02, 169.08, 172.91, 172.55, 170.24,
    157.64, 148.97, 143.33, 158.96, 188.42, 182.00, 182.10, 182.40, 175.01, 170.00,
    179.90, 173.55, 175.51, 181.80, 176.40, 178.58, 178.13, 175.35, 176.13, 173.92,
    188.39, 177.92, 184.68, 184.97, 186.54, 199.55, 218.89, 249.81, 251.00, 263.30,
    255.97, 252.73, 247.79, 253.60, 216.80, 224.90, 227.90, 214.88, 200.75, 195.70,
    199.02, 207.39, 211.15, 224.88, 223.82, 218.75, 209.72, 208.63, 210.59, 232.60,
    220.07, 224.66, 229.30, 230.09, 241.52, 254.08, 260.60, 259.04, 247.55, 246.69
];

let currentIndex = 0;
let netProfit = 0;
let shares = 0;
let stockPrice = fakeData[currentIndex];
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
document.getElementById('ticker-form').addEventListener('submit', function(e) {
    e.preventDefault();
    startGame();
});

// ==================== GAME LOGIC ====================
function startGame() {
    currentIndex = 0;
    netProfit = 0;
    shares = 0;
    stockChart.data.labels = [];
    stockChart.data.datasets[0].data = [];
    updateNetProfit();

    timer = setInterval(function() {
        if (currentIndex < fakeData.length) {
            updateStockChart();
        } else {
            clearInterval(timer);
            alert(`Game over! Your final profit is $${netProfit.toFixed(2)}`);
        }
    }, 1000); // Update every 1 second
}

function updateStockChart() {
    stockPrice = fakeData[currentIndex];
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
