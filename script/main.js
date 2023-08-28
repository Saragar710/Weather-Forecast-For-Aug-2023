var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";


var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

var createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
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


function getApi(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);



fetch(queryURL)
.then(function (response){
    return response.json();
})
.then(function (data) {
    console.log(data);
    console.log(lat, lon)

   
})
}
 

formButton.addEventListener("click", function() {
    event.preventDefault()
 var selectedCity = cityInput.value;
 console.log(selectedCity)
 getApi(selectedCity)
})

var lat = "";
var lon = "";

function getFiveDayWeather( lat, lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    // console.log(data.lon, data.lat)
    fetch(queryURL)  
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {  
    var uniqueForecastDate = [];
    return  data.list.filter(forecast => {
        var forecastDate = new Date(forecast.dt_text).getDate();
        if(!uniqueForecastDate.includes(forecastDate)) {
         uniqueForecastDate.push(forecast);
         return true;
        }
        return false;
    });
    // .catch(function(error) {
    //     console.log(error);
    // });

     })
    .then(function (fiveDayForecast){
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
    
        console.log(fiveDayForecast);
        fiveDayForecast.forEach((weatherItem, index) => {
            // if(index === 0) {
            // weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
    
            // } else{
    
            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            //}
            
     });

    
    });

 };
 localStorage.setItem("forecast", forecastData);
 localStorage.getItem("forecast");