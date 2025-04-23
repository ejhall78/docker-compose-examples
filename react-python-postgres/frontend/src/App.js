import './App.css';
import { useState, useEffect } from "react";

function App() {
  var host = "http://localhost:8000"
  if (process.env.REACT_APP_API_BASE_URL) {
    host = process.env.REACT_APP_API_BASE_URL
  }

  const [clicks, setClicks] = useState(null);

  useEffect(() => {
    fetch(`${host}/getclicks`)
      .then(response => response.json())
      .then(json => setClicks(json))
      .catch(error => console.error(error));
  }, []);

  const incrementClicks = () => {
    fetch(`${host}/incrementclicks`)
      .then(response => response.json())
      .then(json => setClicks(json))
      .catch(error => console.error(error));
  }

  const resetClicks = () => {
    fetch(`${host}/resetclicks`)
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
