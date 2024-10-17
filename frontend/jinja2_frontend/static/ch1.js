// Fetch and display Ch1 content
async function fetchCh1Content() {
    try {
        const response = await fetch('/get_ch1_content');
        const data = await response.json();

        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = data.content; // Display the HTML content
    } catch (error) {
        console.error('Error fetching Ch1 content:', error);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchCh1Content);