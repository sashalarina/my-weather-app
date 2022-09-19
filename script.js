//Week 4 Homework__________
let current = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = days[current.getDay()];
let currentHour = current.getHours();
let currentMinutes = current.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

//Bonus Feature_________________
function showFahreinheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-degrees");
  todayTemp.innerHTML = Math.round(20 * 1.8 + 32);
}

function showCelcius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#today-degrees");
  todayTemp.innerHTML = 20;
}
let celciusTemp = document.querySelector("#celcius-citytemp");
let fahreinheitTemp = document.querySelector("#fahreinheit-citytemp");
let todayTemp = document.querySelector("#today-degrees");

fahreinheitTemp.addEventListener("click", showFahreinheit);

celciusTemp.addEventListener("click", showCelcius);

//Week 5 Homework ________
//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

function showCity(citySearched) {
  citySearched.preventDefault();
  let citySearchInput = document.querySelector("#type-city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${
    citySearchInput.value.charAt(0).toUpperCase() +
    citySearchInput.value.slice(1)
  }`;
  function retrieveTemperature(response) {
    let temperature = document.querySelector("#today-degrees");
    temperature.innerHTML = Math.round(response.data.main.temp);
    document.querySelector("h1").innerHTML = response.data.name;
  }

  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let city = citySearchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveTemperature);
}
let citySearched = document.querySelector("#citysearch-form");
citySearched.addEventListener("submit", showCity);

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function retrieveGeoLocationTemperature(response) {
  document.querySelector("#today-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
}

function showGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(retrieveGeoLocationTemperature);
}

function showGeoLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeolocation);
}

let geoLocation = document.querySelector("#current-location-button");
geoLocation.addEventListener("click", showGeoLocationTemp);
