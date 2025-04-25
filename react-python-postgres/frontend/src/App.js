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

  console.log("dbStuff below")

  const [clicksDB, setClicksDB] = useState(null);

  useEffect(() => {
    fetch(`${host}/getclicksdb`)
      .then(response => response.json())
      .then(json => setClicksDB(json))
      .catch(error => console.error(error));
  }, []);

  const incrementClicksDB = () => {
    fetch(`${host}/incrementclicksdb`)
      .then(response => response.json())
      .then(json => setClicksDB(json))
      .catch(error => console.error(error));
  }

  const resetClicksDB = () => {
    fetch(`${host}/resetclicksdb`)
      .then(response => response.json())
      .then(json => setClicksDB(json))
      .catch(error => console.error(error));
  }

  return (
    <div>
      {clicks !== null ? <p>{clicks}</p> : 'Loading...'}
      <button onClick={incrementClicks}>Increment Clicks</button>
      <button onClick={resetClicks}>Reset Clicks</button>
      <br />
      {clicksDB !== null ? <p>{clicksDB}</p> : 'Loading...'}
      <button onClick={incrementClicksDB}>Increment Database Clicks</button>
      <button onClick={resetClicksDB}>Reset Database Clicks</button>
    </div>
  );
}

export default App;
