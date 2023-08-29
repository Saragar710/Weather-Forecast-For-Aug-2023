var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";


var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

var createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
        return `   <div class="details">
        <h3>${cityName}(${weatherItem.dt_txt.split(" ")[0]})</h3>
        <h4>Temperature:${weatherItem.main.temp}</h4>
        <h4>Wind Speed: ${weatherItem.wind.speed}mph</h4>
        <h4>Humidity:${weatherItem.main.humidity} %</h4>
      </div>
      <div class="icon">
      <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon} /@2x.png" alt="weather-icon">
      <h4>${weatherItem.weather[0].description}</h4>
    </div>`;


    } else {
        return `<li class="weather-cards">
           <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
           <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}2x.png" alt="weather-icon">"
           <h4>Temperature: ${weatherItem.main.temp}</h4>
           <h4>Wind Speed: ${weatherItem.wind.speed}mph</h4>
           <h4>Humidity: ${weatherItem.main.humidity}%</h4>
    </li>`;
    }
}


function getApi(city) {
    var queryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}
    `;
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryUrl);



    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
          getWeather(data[0])


        })
}


formButton.addEventListener("click", function () {
    event.preventDefault()
    var selectedCity = cityInput.value;
    console.log(selectedCity)
    getApi(selectedCity)
})



//function getFiveDayWeather(lat, lon) {
    function getWeather(location) {
        console.log(location)
        var {lat,lon}= location
        console.log(lat,lon)
        var city = location.name
        var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           console.log(data)
           //data.city.name,data.list[0],
            currentDay(data.city.name,data.list[0]);

        //    forecastDays(data.list)
        });

};
function currentDay(city, weather){
    console.log(city)
    console.log(weather)
    //temp, wind, humidity, icon
    //weather.main.temp, weather.main.humidity, weather.wind.speed

}
localStorage.setItem("forecast", forecastData);
localStorage.getItem("forecast");