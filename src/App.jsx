import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');

  const key = "42fa5a94d0cd02314dbc2a8e03bedf05";
  
  const searchFunction = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;
      axios.get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data", error);
        });
    }
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <input
            onChange={event => setLocation(event.target.value)}
            value={location}
            onKeyPress={searchFunction}
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="container">
          {data && (
            <>
              <div className="top">
                <div className="location">
                  <h1>{data.name}</h1>
                </div>
                <div className="temp">
                  <h3>{data.main.temp}°C</h3>
                </div>
                <div className="description">
                  <p>{data.weather[0].description}</p>
                </div>
              </div>
              <div className="bottom">
                <div className="feels">
                  <h2>{data.main.feels_like}°C</h2>
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  <h2>{data.main.humidity}%</h2>
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  <h2>{data.wind.speed} km/h</h2>
                  <p>Wind</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

