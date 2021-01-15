/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here
let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();

if (weather[city] === undefined) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
} else {
  let humidity = weather[city].humidity;
  let temperature = weather[city].temp;

  alert(
    `It is currently ${temperature} degrees in ${city} with a humidity of ${humidity}%.`
  );
}
console.log(weather.city);
console.log(city);*/

// change the current time and day
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
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
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hour}:${minute}`;

//display the city name on the page after the user submits the form
function showCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form-control-search");
  let city = document.querySelector("h2");
  if (cityInput.value) {
    city.innerText = `${cityInput.value}`;
  } else {
    city.innerHTML = "Please enter a city";
  }
}
let form = document.querySelector(".search-bar");
form.addEventListener("submit", showCurrentCity);

//convert CtoF and FtoC
function converToFarenheit() {
  let degree = document.querySelector(".degree-number");
  degree.innerHTML = "46";
}
let farenheit = document.querySelector(".farenheit");
farenheit.addEventListener("click", converToFarenheit);

function convertToCelsius() {
  let degree = document.querySelector(".degree-number");
  degree.innerHTML = "8";
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", convertToCelsius);

//show current temperature in the city

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

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
}

/*function searchCity(city) {
  let apiKey = "dc56a0fdc815a8ed54bd6518609ecbc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}*/

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form-control-search").value;
  let apiKey = "dc56a0fdc815a8ed54bd6518609ecbc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
  /*searchCity("city");*/
}
let newCity = document.querySelector(".search-bar");
newCity.addEventListener("click", showCity);

//current location button

function showCurrentLocationTemp(response) {
  let currentCity = response.data.name;
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

  axios.get(`${apiUrl}`).then(showCurrentLocationTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector(".current-search");
currentLocation.addEventListener("click", getCurrentLocation);

//searchCity("London");
