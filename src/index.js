////////////////////////////////////////////////////change city
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityInput.value.toUpperCase();
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

//////////////////////////////////////////////////date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let li = document.querySelector("li#day-display");
li.innerHTML = `${today}, ${hour}:${minutes}`;

///////////////////////////////////////////////////////////////degree changes
function changeCelsius(event) {
  event.preventDefault();
  let newCelsius = document.querySelector("#temp");
  newCelsius.innerHTML = "22° F";
}

let celsiusChange = document.querySelector("#celsius-link");
celsiusChange.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let newFahrenheit = document.querySelector("#temp");
  newFahrenheit.innerHTML = "72° F";
}

let fahrenheitChange = document.querySelector("#Fahrenheit-link");
fahrenheitChange.addEventListener("click", changeFahrenheit);

///////////////////////////////////////////////////////////////////////API

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  let currentCity = `${cityInput.value}`;
  city.innerHTML = currentCity;

  let apiKey = `2a42ede14ccfd66d99f2a3df5a6d3999`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

let searchResult = document.querySelector("#search-form");
searchResult.addEventListener("submit", displayCity);

function displayWeather(response) {
  event.preventDefault();
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = `${temp}°`;

  let weather = document.querySelector("#feel-temp");
  weather.innerHTML = response.data.weather[0].main;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;

  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} MPH`;

  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
}

axios.get(apiUrl).then(displayWeather);

//////////////////////////////////////////////////////////////////////////location

function showPosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `2a42ede14ccfd66d99f2a3df5a6d3999`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#icon-geo");
locationButton.addEventListener("click", getLocation);
