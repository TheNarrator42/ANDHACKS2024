  document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    const formData = new URLSearchParams(new FormData(event.target));  // Convert to URL-encoded format

    fetch('/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Set the correct content type
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').textContent = 'Result: ' + data.result;  // Display result
    })
    .catch(error => console.error('Error:', error));
  });