import clear from './clear.svg';
import cloudy from './cloudy.svg';
import drizzle from './drizzle.svg';
import fog from './fog.svg';
import mostlycloudy from './mostlycloudy.svg';
import partlycloudy from './partlycloudy.svg';
import rain from './rain.svg';
import snow from './snow.svg';
import storm from './storm.svg';
import search from './search-interface-symbol_54481.png';
import humidity from './humidity.png';
import wind from './wind.png';
import {useState} from "react";
import './App.css';
function App() {
  const [cityName,setCityName]=useState("Baalbeck");
  const [weatherStatus,setWheatherStatus]=useState("cloudy");
  const [Humidity,setHumidity]=useState(65);
  const [degre,setDegre]=useState(19);
  const [pressure,setPressure]=useState(31+"km/h");
  const [forecastData, setForecastData] = useState([]);
  const [i,setIcon]=useState(clear);
const handleClick=(event)=>{
  setCityName(event.target.value);
}
  function getWeatherIcon(conditionCode)  {

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

  async function fetchWeatherData() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=11a8b3654238eacc78180f3e05e63e9a`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWheatherStatus(data.list[0].weather[0].main);
      setHumidity(data.list[0].main.humidity);
      setDegre(parseInt( data.list[0].main.temp-270));
      setPressure(data.list[0].wind.speed);
     const theForecast=[
       {icon:getWeatherIcon(data.list[0].weather[0].id),hour:new Date(data.list[0].dt_txt ).getHours()+":00",temp:data.list[0].main.temp},
       {icon:getWeatherIcon(data.list[1].weather[0].id),hour:new Date(data.list[1].dt_txt ).getHours()+":00",temp:data.list[1].main.temp},
       {icon:getWeatherIcon(data.list[2].weather[0].id),hour:new Date(data.list[2].dt_txt ).getHours()+":00",temp:data.list[2].main.temp},
       {icon:getWeatherIcon(data.list[3].weather[0].id),hour:new Date(data.list[3].dt_txt ).getHours()+":00",temp:data.list[3].main.temp},
       {icon:getWeatherIcon(data.list[4].weather[0].id),hour:new Date(data.list[4].dt_txt ).getHours()+":00",temp:data.list[4].main.temp},
       {icon:getWeatherIcon(data.list[5].weather[0].id),hour:new Date(data.list[5].dt_txt ).getHours()+":00",temp:data.list[5].main.temp},
       {icon:getWeatherIcon(data.list[6].weather[0].id),hour:new Date(data.list[6].dt_txt ).getHours()+":00",temp:data.list[6].main.temp}
      ];
      setForecastData(theForecast);   
      setIcon(getWeatherIcon(data.list[0].weather[0].id)); 
    }
    catch (error) {
      console.error(error);
    }
  }
fetchWeatherData();
  return (
  
    <div class="weather-container">
    <div class="search-container">
        <div class="search-icon">
            <img src={search} alt="Search Icon"/>
        </div>
        <div class="search-text">
            <input onChange={handleClick} type="text" id="search-input" placeholder="Weather in your city "/>
            <div class="underscore"></div>
        </div>
    </div>
    <div class="weather">
       <div class="weather-info">
        <h1 class="cityName">{cityName}</h1>
        <h2 class="weather-hala">{weatherStatus}</h2>
        </div>
        <div class="content">
            <div class="weather-info1">
        <img src={i} class="img-weather"/>
        <h3 class="degree">{degre} &deg;C</h3>
        </div>
    <div class="weather-info2">
        <div class="humdatity">
            <img src={humidity}/>
            <h3>Humidity: {Humidity}%</h3>
        </div>
        <div class="presure">
            <img src={wind}/>
            <h3>wind: {pressure} </h3>
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
            <img src={x.icon}  />
          </div>
          <div>{parseInt(x.temp-273.15)}&deg;C</div>
        </div>
      ))}
    </div>
    </div>
    
  );
}

export default App;
