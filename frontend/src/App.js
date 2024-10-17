import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/get_ch1_content')
      .then(response => response.json())
      .then(data => setData(data.content))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test CORS with Flask and React</h1>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </header>
    </div>
  );
}

export default App;