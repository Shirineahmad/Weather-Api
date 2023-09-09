import "./App.css";
import { useState } from "react";
// import axios from 'axios';
import search from "./weather-icons/search-interface-symbol_54481.png";
import humidity from "./weather-icons/humidity.png";
import presure from "./weather-icons/wind.png";
import imgContainer from "./weather-icons/cloudy.png";
import Carousel from "./Carousel";

function App() {
  const [city, setCity] = useState("Beirut");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=aa56ba779b16a9ec32c4cf44f9642cae`;
  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  };
  fetchData(url);
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const input_search = document.getElementById("search-input");
      console.log(input_search.target.value);
      setCity(input_search.target.value);
    }
  };

  return (
    <div className="weather-container">
      {/* search  */}
      <div className="search-container">
        <div className="search-icon">
          <img src={search} alt="Search Icon" />
        </div>
        <div className="search-text">
          <input
            type="text"
            id="search-input"
            placeholder="Weather in your city"
            onKeyPress={searchLocation}
          />
          <div className="underscore"></div>
        </div>
      </div>
      {/* middle */}
      <div className="weather-city">
        <div className="weather">
          <div className="weather-info">
            {data && (
              <h1 className="cityName">{data.city ? data.city.name : null}</h1>
            )}
            {data &&
              data.list &&
              data.list.length &&
              data.list.map((item) => {
                item.weather &&
                  item.weather.length &&
                  item.weather.map((itemWeather) => {
                    <h2 className="weather-hala">itemWeather.main</h2>;
                  });
              })}
          </div>
          <div className="content">
            <div className="weather-info1">
              <img src={imgContainer} className="img-weather" />
              {data &&
                data.list &&
                data.list.length &&
                data.list.map((item) => {
                  <h3 className="degree">item.main.temp &deg;C</h3>;
                })}
            </div>

            <div className="weather-info2">
              <div className="humidity">
                <img src={humidity} className="img-weather-info" />
                {data &&
                  data.list &&
                  data.list.length &&
                  data.list.map((item) => {
                    <h3 className="font-humidity">item.main.humidity %</h3>;
                  })}
              </div>
              <div className="presure">
                <img src={presure} className="img-weather-info" />
                {data &&
                  data.list &&
                  data.list.length &&
                  data.list.map((item) => {
                    <h3 className="font-presure">item.main.pressure %</h3>;
                  })}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      {/* part3 */}

      <div className="hourly-status-parent">
        {data &&
          data.list &&
          data.list.length &&
          data.list.map((item) => {
            <Carousel time={item.dt_txt} key={item.dt} temp={item.temp} />;
          })}
      </div>
    </div>
  );
}

export default App;
