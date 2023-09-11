import clear from "./clear.svg";
import cloudy from "./cloudy.svg";
import drizzle from "./drizzle.svg";
import fog from "./fog.svg";
import mostlycloudy from "./mostlycloudy.svg";
import partlycloudy from "./partlycloudy.svg";
import rain from "./rain.svg";
import snow from "./snow.svg";
import storm from "./storm.svg";
import search from "./search-interface-symbol_54481.png";
import humidity from "./humidity.png";
import wind from "./wind.png";
import back from "./back.jpg";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [cityName, setCityName] = useState("Baalbeck");
  const [forecastData, setForecastData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [doIt, setDo] = useState(true);

  const handleChange = (event) => {
    setCityName(event.target.value);
  };
  const handlePress = (event) => {
    if (event.key === "Enter") fetchData();
  };
  function getWeatherIcon(conditionCode) {
    switch (conditionCode) {
      case 800:
        return clear;
      case 801:
      case 802:
      case 803:
        return partlycloudy;
      case 804:
        return cloudy;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return rain;
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return drizzle;
      default:
        return partlycloudy;
    }
  }

  function fetchData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=11a8b3654238eacc78180f3e05e63e9a`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        const theForecast = [
          {
            icon: getWeatherIcon(data.list[0].weather[0].id),
            hour: new Date(data.list[0].dt_txt).getHours() + ":00",
            temp: data.list[0].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[1].weather[0].id),
            hour: new Date(data.list[1].dt_txt).getHours() + ":00",
            temp: data.list[1].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[2].weather[0].id),
            hour: new Date(data.list[2].dt_txt).getHours() + ":00",
            temp: data.list[2].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[3].weather[0].id),
            hour: new Date(data.list[3].dt_txt).getHours() + ":00",
            temp: data.list[3].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[4].weather[0].id),
            hour: new Date(data.list[4].dt_txt).getHours() + ":00",
            temp: data.list[4].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[5].weather[0].id),
            hour: new Date(data.list[5].dt_txt).getHours() + ":00",
            temp: data.list[5].main.temp,
          },
          {
            icon: getWeatherIcon(data.list[6].weather[0].id),
            hour: new Date(data.list[6].dt_txt).getHours() + ":00",
            temp: data.list[6].main.temp,
          },
        ];
        setForecastData(theForecast);
      })
      .catch((err) => {
        setError(err.message);
        setCityName("Baalbeck");
        setDo((prevState) => !prevState);
        console.log(cityName);
        
      });
  }
  useEffect(() => {
    fetchData();
  }, [doIt]);
  return (
    <div className="weather-container">
      <div className="search-container">
        <div className="search-icon">
          <img src={search} alt="Search Icon" />
        </div>
        <div className="search-text">
          <input
            onKeyPress={handlePress}
            onChange={handleChange}
            type="text"
            id="search-input"
            placeholder="Weather in your city "
          />
          <div className="underscore"></div>
        </div>
      </div>
      <div className="weather">
        <div className="weather-info">
          <h1 className="cityName">{cityName}</h1>
          {data.list !== undefined && (
            <h2 className="weather-hala">{data.list[0].weather[0].main}</h2>
          )}
        </div>
        <div className="content">
          <div className="weather-info1">
            {data.list !== undefined && (
              <img
                src={getWeatherIcon(data.list[0].weather[0].id)}
                className="img-weather"
              />
            )}
            {data.list !== undefined && (
              <h3 className="degree">
                {parseInt(data.list[0].main.temp - 270)} &deg;C
              </h3>
            )}
          </div>
          <div className="weather-info2">
            <div className="humdatity">
              <img src={humidity} />
              {data.list !== undefined && (
                <h3>Humidity: {data.list[0].main.humidity}%</h3>
              )}
            </div>
            <div className="presure">
              <img src={wind} />
              {data.list !== undefined && (
                <h3>wind: {parseInt(data.list[0].wind.speed)} </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="hourly-status-parent">
        {forecastData.map((x, index) => (
          <div className="hourly-status-child" key={index}>
            <div>{x.hour}</div>
            <div>
              <img src={x.icon} />
            </div>
            <div>{parseInt(x.temp - 273.15)}&deg;C</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
