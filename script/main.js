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
       
           city(data);
        })
}  

var cityDataArray = [];
function getCityData(city) {
    console.log(city);
    
    fetch(city)
     .then(function (response){
        return response.json();
     })
     .then(function (cityData){
        console.log(cityData[0]);
       
        localStorage.setItem("cityData", JSON.stringify(cityData));

        cityDataArray = JSON.parse(localStorage.getItem("cityData"));
         
        console.log(cityDateArray);
        if(cityDataArray  !== null) {
            console.log("Everything is good.");
         }
     });
    }    
       
function getWeatherData(){
   var weatherData = cityInput.value
    var buttonEl = document.createElement("div");
    buttonEl.setAttribute("class", "btn-history");
    buttonEl.setAttribute("data-search", "array[i]");
    buttonEl.append(div);

buttonEl.addEventListener("click", function () {
    event.preventDefault()
    console.log(weatherData)
});
    }

getCityData();

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
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();

    var forecastContainer = document.getElementById("forecastCard")
    for (let i = 0; i < weather.length; i++) {
        //First filters through all of the data and returns only data that falls between ond day after the current data and up to 5 days later.
        if(weather[i].dt_text.slice(11, 13) == "12"){
         const forecast = weather[i];

         //pulling data creating variables
        var temp = weather.main.temp;
        var humidity = weather.main.humidity;
        var wind = weather.wind.speed;
        var icon = `https:://openforecastmap.org/imp/w/${forecast.weather[0].icon.png}`;
        var iconAlt = weather.weather[0].description

 //creating card / cardbody
         var card = document.createElement("div")
         var cardbody = document.createElement("div")
         card.setAttribute("class", "card")
 //add class and append to card
 cardbody.setAttribute("class", "card-body")
 card.append(cardbody)

 // create the elements for the cardbody
 var tempEl = document.createElement("p")
 var humidityEl = document.createElement("p")
 var windEl = document.createElement("p")
 var imgIconEl = document.createElement("img")

//add the attributes like class, src, alt
tempEl.setAttribute("class", "card-text")
humidityEl.setAttribute("class", "card-text")
windEl.setAttribute("class", "card-text")

//add contents to Element

imgIconEl.setAttribute("src", icon)
imgIconEl.setAttribute("alt", iconAlt)
imgIconEl.setAttribute("class", "altIcon")

tempEl.textContent = `Temp: ${temp} F`
humidityEl.textContent = `Humidity: ${humidity} %`
windEl.textContent = `Wind: ${wind} MPH`

//append above to cardbody
cardbody.append(imgIconEl, tempEl, windEl, humidityEl)

//append the card to html conainer for 5 day forecast
forecastContainer.append(card)
        }
    }
}

function currentDay(city, weather){
    var date = dayjs().format('M/D/YYYY');
    console.log(city)
    console.log(weather)

    var todayContainer = document.getElementById("today")
//pulling data creating variables
var temp = weather.main.temp;
 var humidity = weather.main.humidity;
 var wind = weather.wind.speed;
 var icon = `https:://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
 var iconAlt = weather.weather[0].description

 //creating card / cardbody
 var card = document.createElement("div")
 var cardbody = document.createElement("div")

 //add class
 card.setAttribute("class", "card")
 cardbody.setAttribute("class","card-body")
 //append cardbody to card (it goes inside the card "wrapper")
 card.append(cardbody)

 //create the elements for the cardbody
 
 var title =  document.createElement("h3")
 var tempEl = document.createElement("p")
 var humidityEl= document.createElement("p")
 var windEl = document.createElement("p")
 var imgIconEl = document.createElement("img")

 //add the attributes like class, src, alt

 title.setAttribute("class",  "h3 card-title")
 tempEl.setAttribute("class", "card-text")
 humidityEl.setAttribute("class", "card-text")
 windEl.setAttribute("class", "card-text")

 title.textContent = `${city} (${date})`;

 imgIconEl.setAttribute("src", icon)
imgIconEl.setAttribute("class", "altIcon")

tempEl.textContent = `Temp: ${temp}`
humidityEl.textContent = `Humidity: ${humidity}`
windEl.textContent = `Wind: ${wind}`

//append above to cardbody: this acts as a "wrapper for the elements/inof to display"

cardbody.append(title, imgIconEl,tempEl, windEl, humidityEl)
todayContainer.append(card)
 
     
    



    //temp, wind, humidity, icon
    //weather.main.temp, weather.main.humidity, weather.wind.speed
 //pulling data creating variables
 
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