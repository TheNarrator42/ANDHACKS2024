// Fetch and display Objectives of Financial Management
async function fetchObjectives() {
    try {
        const response = await fetch('/intro_finance/objectives');
        const data = await response.json();

        const objectivesList = document.getElementById('objectives-list');
        objectivesList.innerHTML = ''; // Clear existing content

        data.objectives.forEach(objective => {
            const li = document.createElement('li');
            li.textContent = objective;
            objectivesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching objectives:', error);
    }
}

// Fetch and display Roles of Financial Managers
async function fetchRoles() {
    try {
        const response = await fetch('/intro_finance/roles');
        const data = await response.json();

        const rolesList = document.getElementById('roles-list');
        rolesList.innerHTML = ''; // Clear existing content

        data.roles_of_financial_managers.forEach(role => {
            const li = document.createElement('li');
            li.textContent = role;
            rolesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
}

// Fetch and display Divisions of Finance
async function fetchDivisions() {
    try {
        const response = await fetch('/intro_finance/divisions');
        const data = await response.json();

        const divisionsList = document.getElementById('divisions-list');
        divisionsList.innerHTML = ''; // Clear existing content

        for (const [division, description] of Object.entries(data.divisions)) {
            const li = document.createElement('li');
            li.textContent = `${division}: ${description}`;
            divisionsList.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching divisions:', error);
    }
}

// Call the functions to fetch and display data when the page loads
window.onload = function() {
    fetchObjectives();
    fetchRoles();
    fetchDivisions();
};
