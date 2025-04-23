import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [clicks, setClicks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/getclicks')
      .then(response => response.json())
      .then(json => setClicks(json))
      .catch(error => console.error(error));
  }, []);

  const incrementClicks = () => {
    fetch('http://localhost:8000/incrementclicks')
      .then(response => response.json())
      .then(json => setClicks(json))
      .catch(error => console.error(error));
  }

  const resetClicks = () => {
    fetch('http://localhost:8000/resetclicks')
      .then(response => response.json())
      .then(json => setClicks(json))
      .catch(error => console.error(error));
  }

  return (
    <div>
      {clicks != null ? <p>{clicks}</p> : 'Loading...'}
      <button onClick={incrementClicks}>Increment Clicks</button>
      <button onClick={resetClicks}>Reset Clicks</button>
    </div>
  );
}

export default App;
