import React, { useState, useEffect } from "react";
import "./App.css";
import search from "./weather-icons/search-interface-symbol_54481.png";
import humidity1 from "./weather-icons/humidity.png";
import Pressure from "./weather-icons/wind.png";
import clear from "./weather-icons/clear.svg";
import sun from "./weather-icons/sun.png";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchWeatherData();
    }
  };

  useEffect(() => {
    const fetchHourlyTemperatures = async () => {
      const apiKey = "5460b9677952ffc4b8817063a12390de"; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const hourlyData = data.list.filter((entry) =>
          entry.dt_txt.includes("12:00:00")
        );

        const hourlyTemps = hourlyData.map((entry) => entry.main.temp);
        setHourlyTemperatures(hourlyTemps);
      } catch (error) {
        console.error("Error fetching hourly data:", error);
      }
    };

    if (city !== "") {
      fetchHourlyTemperatures();
    }
  }, [city]);

  const fetchWeatherData = () => {
    const apiKey = "6c81cf6fc38f4a4ef1128949a51ac417";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTemperature(Math.round(data.main.temp));
        setHumidity(data.main.humidity);
        setPressure(data.main.pressure);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <div className="search-icon">
          <img src={search} alt="Search Icon" />
        </div>
        <div className="search-text">
          <input
            type="text"
            id="search-input"
            placeholder="Weather in your city "
            value={city}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <div className="underscore"></div>
        </div>
      </div>

      <div className="weather">
        <div className="weather-info">
          <h1 className="cityName">{city}</h1>
          <h2 className="weather-condition">Clear Sky</h2>
        </div>
        <div className="content">
          <div className="weather-info1">
            <img src={sun} className="img-weather" alt="Sun Icon" />
            <h3 className="degree">{temperature} °C</h3>
          </div>

          <div className="weather-info2">
            <div className="humidity">
              <img src={humidity1} alt="humidity-icon" />
              <h3>Humidity: {humidity}%</h3>
            </div>
            <div className="pressure">
              <img src={Pressure} alt="pressure-icon" />
              <h3>Pressure: {pressure} hPa</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="hourly-status-parent">
  {[6, 9, 12, 15, 18].slice(0, 6 ).map((hour, index) => {
    const roundedTemperature = Math.round(hourlyTemperatures[index]);

    return (
      <div key={index} className="hourly-status-child">
        <div>{`${hour.toString().padStart(2, "0")}:00${hour >= 21 ? "PM" : "AM"}`}</div>
        <div>
          <img src={clear} alt="" />
        </div>
        <div>{`${roundedTemperature}°C`}</div>
      </div>
    );
  })}
</div>


    </div>
  );
}

export default App;