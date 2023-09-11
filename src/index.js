let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let currentHour = date.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let now = document.querySelector("h3");
now.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let city = document.querySelector("#city").value;
}
let form = document.querySelector("form");
form.addEventListener("submit", changeCity);
//Challenge 3s
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celciusTemperature = null;

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kielce");
displayForecast();
