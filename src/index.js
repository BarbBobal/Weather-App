// -----------------the current time and day when app opens

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
let day = days[date.getDay()];
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

//-------------show current temperature in the city you search for

function currentWeather(response) {
  console.log(response.data);
  let city = document.querySelector("h2");
  let currentCity = response.data.name;
  city.innerText = `${currentCity}`;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".degree-number");
  currentTemperature.innerText = `${temperature}`;

  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `${currentHumidity}`;

  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  celsius = response.data.main.temp;
}

//---------------------------------------forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(displayForecast);

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
            <h4>${formatHours(forecast.dt * 1000)}</h4>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" id="forecast-icon">
            <p> ${Math.round(forecast.main.temp_max)}°/<span> ${Math.round(
      forecast.main.temp_min
    )}°</span></p>
          </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "dc56a0fdc815a8ed54bd6518609ecbc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form-control-search");
  searchCity(cityInput.value);
}

let newCity = document.querySelector(".search-bar");
newCity.addEventListener("submit", handleSubmit);

//--------------------------------convert C to F and F to C
function converToFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".degree-number");
  //celsiusLink.classList.remove("active");
  //farenheitLink.classList.add("active");
  let farenheit = (celsius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheit);
}

function convertToCelsius() {
  event.preventDefault();
  let degree = document.querySelector(".degree-number");
  event.preventDefault();
  // celsiusLink.classList.add("active");
  // farenheitLink.classList.remove("active");
  degree.innerHTML = Math.round(celsius);
}

let farenheitLink = document.querySelector(".farenheit");
farenheitLink.addEventListener("click", converToFarenheit);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", convertToCelsius);
let celsius = null;

//--------------------------------current location button

function showCurrentLocationTemp(response) {
  let currentCity = response.data.name;
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("h2");
  let currentTemp = document.querySelector(".degree-number");
  city.innerHTML = `${currentCity}`;
  currentTemp.innerHTML = `${temperature}`;
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dc56a0fdc815a8ed54bd6518609ecbc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentLocationTemp);
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(api).then(displayForecast);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector(".current-search-btn");
currentLocation.addEventListener("click", getCurrentLocation);
searchCity("London");

//--------------------change placeholder text onclick

function changePlaceholderText() {
  console.log(changePlaceholderText);
  document.querySelector(".form-control-search").placeholder =
    "Please enter a city...";
}
let emptyCity = document.querySelector(".search-bar");
emptyCity.addEventListener("submit", changePlaceholderText);
