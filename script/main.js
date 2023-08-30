var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";


var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");


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

           forecastDays(data.list)

        });

};
function forecastDays(weather) {
    var forecastContainer = document.getElementById("forecastCard")
    for (let i = 0; i < weather.length; i++) {
        const weather = weather[i];
        var temp = weather.main.temp;
 var humidity = weather.main.humidity;
 var wind = weather.wind.speed;

 //creating card
 var card = document.createElement("div")
 card.setAttribute("class", "card")
 //making card body

 var cardbody = document.createElement("div")
 cardbody.setAttribute("class", "card-body")
 card.append(cardbody)
 // title 
 var title =  document.createElement("h2")
 title.setAttribute("class",  "h2 card-title")
 title.textContent = city;

 //append cardbody and title
 var tempEl = document.createElement("p")
 var humidityEl = document.createElement("p")
 var windEl = document.createElement("p")
 tempEl.setAttribute("class", "card-text")
 humidityEl.setAttribute("class", "card-text")
 windEl.setAttribute("class", "card-text")
tempEl.textContent = `Temp: ${temp}`
humidityEl.textContent = `Humidity: ${humidity}`
windEl.textContent = `Wind: ${wind}`
cardbody.append(title, tempEl, windEl, humidityEl)
forecastContainer.append(card)
 }
        
    }


function currentDay(city, weather){
    console.log(city)
    console.log(weather)
    var todayContainer = document.getElementById("today")
    //temp, wind, humidity, icon
    //weather.main.temp, weather.main.humidity, weather.wind.speed
 //pulling data creating variables
 var temp = weather.main.temp;
 var humidity = weather.main.humidity;
 var wind = weather.wind.speed;
 var icon = `https:://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
 var iconAlt = weather.weather[0].description

 //creating card
 var card = document.createElement("div")
 card.setAttribute("class", "card")

 //making card body
 var cardbody = document.createElement("div")
 cardbody.setAttribute("class", "card-body")
 card.append(cardbody)

 // title 
 var title =  document.createElement("h3")
 title.setAttribute("class",  "h3 card-title")
 title.textContent = city;

 //create elements to apply data to it, goes to card body
 var tempEl = document.createElement("p")
 var humidityEl = document.createElement("p")
 var windEl = document.createElement("p")
 var imgIconEl = document.createElement("img")


//setattributes of class, src and alt added to the element variabnles
 tempEl.setAttribute("class", "card-text")
 humidityEl.setAttribute("class", "card-text")
 windEl.setAttribute("class", "card-text")
 imgIconEl.setAttribute("src", icon)
 imgIconEl.setAttribute("alt", iconAlt)
 imgIconEl.setAttribute("class", "altIcon")
 //textcontent added to the element variables
tempEl.textContent = `Temp: ${temp}`
humidityEl.textContent = `Humidity: ${humidity}`
windEl.textContent = `Wind: ${wind}`



cardbody.append(title, imgIconEl, tempEl, windEl, humidityEl)
 todayContainer.append(card)
}
// localStorage.setItem("forecast", forecastData);
// localStorage.getItem("forecast");