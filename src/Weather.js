import React, { useState } from "react";
import axios from "axios";
import "./TopSection.css";
import "./MiddleSection.css";
import "./BottomSection.css";
import "./Footer.css";

export default function TopSection() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState(null);

  //find current date, year, day and time
  let now = new Date();

  //Current MONTH
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  //Current DATE
  let date = now.getDate();

  //Current YEAR
  let year = now.getFullYear();

  //Getting current DAY
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  //Getting current TIME
  let hour = now.getHours();
  let min = now.getMinutes();
  let suffix;
  if (hour >= 12 && min > 0) suffix = "PM";
  else suffix = "AM";

  if (hour > 12) hour = hour - 12;
  let minutes = (min < 10 ? "0" : "") + now.getMinutes();

  function showWeather(response) {
    console.log(response.data);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    setLoaded(true);
  }

  function search() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f7dffd4359849bb28c77fa4fe304c30f&units=metric`;
    axios.get(url).then(showWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function showCurrentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "f7dffd4359849bb28c77fa4fe304c30f";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
  }

  function currentCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
  }

  if (loaded) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="heading">
            <input
              type="text"
              placeholder="Enter a city..."
              className="search-bar"
              id="search-city"
              autoComplete="off"
              onChange={updateCity}
            />
            <button
              className="search-button"
              id="search"
              type="submit"
            >
              Search
            </button>
            <button className="current-location" onClick={currentCity}>
              <i className="fa-solid fa-location-dot"></i>
            </button>
          </div>
        </form>
        <div className="middle-section">
          <div className="container" id="weather-container-left">
            <div className="city" id="current-city">
              {weather.city}
            </div>
            <div className="date" id="display-date">
              <strong>
                <span id="current-month">{month} </span>
              </strong>
              <strong>
                <span id="current-date">{date},</span>
              </strong>
              <span id="current-year">{year}</span>
            </div>
            <div className="day-time" id="day-time">
              <strong>
                <span className="displayed-day" id="current-day">
                  {day},
                </span>
              </strong>
              <span className="time" id="current-time">
                {hour}:{minutes}
              </span>
              <span className="am-pm" id="current-am-pm">
                {suffix}
              </span>
            </div>
          </div>

          <div className="container" id="weather-container-middle">
            <div className="weather-icon">
              <img src={weather.icon} alt={weather.description} />
            </div>
            <div className="weather-description">{weather.description}</div>
            <div className="temperature">
              <div className="temp">
                <div className="temp-number">
                  <strong>
                    <span
                      className="current-temperature"
                      id="display-temperature"
                    >
                      {Math.round(weather.temperature)}
                    </span>
                  </strong>
                </div>
              </div>
              <div className="temp">
                <div className="temp-unit">
                  &#xb0;
                  <a href="/" className="active" id="celsius-link">
                    C
                  </a>
                  |&#xb0;
                  <a href="/" id="fahrenheit-link">
                    F
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container" id="weather-container-right">
            <div className="humidity">Humidity: {weather.humidity}%</div>
            <div className="wind">Wind: {weather.wind} mph</div>
          </div>
        </div>
        <div className="bottom-section" id="forecast"></div>
        <div className="footer">
          <p>
            <a
              href="https://github.com/chaitalinandkar/react-weather-app"
              className="open-source-code"
              target="_blank"
              rel="noreferrer"
            >
              Open-source code
            </a>{" "}
            by Chaitali Nandkar
          </p>
        </div>
      </div>
    );
  } else {
      return (<form onSubmit={handleSubmit}>
            <div className="heading">
              <input
                type="text"
                placeholder="Enter a city..."
                className="search-bar"
                id="search-city"
                autoComplete="off"
                onChange={updateCity}
              />
              <button
                className="search-button"
                id="search"
                type="submit"
                
              >
                Search
              </button>
              <button className="current-location" onClick={currentCity}>
                <i className="fa-solid fa-location-dot"></i>
              </button>
            </div>
      </form>);
    
    }
  }


