var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";

var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

var createWeatherCard = (CityName, weatherItem, index) => {
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
    console.log(city)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



fetch(queryURL)
.then(function (response){
    return response.json();
})
.then(function (data) {
    console.log(data);
    // for(var i = 0; < data.length; i++){
    //    var listItem = document. 
    // }
 })
}
 

formButton.addEventListener("click", function() {
 var selectedCity = cityInput.value;
 console.log(selectedCity)
 getApi(selectedCity)
})

function getApi(city){ 
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/hourly?q=" + city + state-code + "&appid=" + APIKey;
    console.log(queryURL);



fetch(queryURL)
.then(function (response){
    return response.json();
})
.then(function (data) {
    console.log(data);

    formButton.addEventListener("click", function() {
        var selectedCity = cityInput.value;
        console.log(selectedCity)
        getApi(selectedCity)

    })
})
}
function getApi(city, lat, lon, APIKey){
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;

    fetch(queryURL)  
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {  
    var uniqueForecastDate = [];
    var fiveDayForecast = data.list.filter(forecast => {
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


    cityInput.value = "";
    currentWeatherDiv.innerHTML = "";
    weatherCardsDiv.innerHTML = "";

    console.log(fiveDayForecast);
    fiveDayForecast.forEach((weatherItem, index) => {
        if(index === 0) {
        weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

        } else{

        weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
        }// createWeatherCard(weatherItem);
    })

 }

//   .catch(() => {
//     alert("Error");
// });
// formButton.addEventListener("click", getSelectedCity);