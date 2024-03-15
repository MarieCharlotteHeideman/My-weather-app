function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.daily[0].temperature.day;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day");
  let date = new Date(response.data.daily[0].time * 1000);

  console.log(response);

  cityElement.innerHTML = response.data.city;
  dayElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.daily[0].condition.description;
  humidityElement.innerHTML = `${response.data.daily[0].temperature.humidity}%`;
  windElement.innerHTML = `${response.data.daily[0].wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
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
  return `${day}`;
}

function searchCity(city) {
  let apiKey = "cd6b0ad6aoad4dt98fd5242505b3e7a3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Haarlem");
