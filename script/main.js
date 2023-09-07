var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";


var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");
//global variables for the history
var cityDataArray = [];
var historyBtn = document.getElementById("history-btn")


//passes city input to get geo coordiantes (name, lat, lon)
function getApi(selectedCity) {
    var city = selectedCity;
    var queryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}
    `;

    console.log(queryUrl);

//fetching the coordinates of city input - getting geo coords
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            //get weather
            getWeather(data[0])

     //reason to place this at end of function instead at top .. we want all the code abouce to execute. We dont want to have to wait
    //until cityHistory completed and then the execution of app would return and then process th remaining func..
    //it would get some sort of error.

            //take city input to another function to send to local storage
            cityHistory(city);
        })
}

//function getFiveDayWeather(lat, lon) {
    function getWeather(location) {
        console.log(location)
        var { lat, lon } = location
        console.log(lat, lon)
        var city = location.name
        var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
        fetch(queryUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                //data.city.name,data.list[0],
                currentDay(data.city.name, data.list[0]);
    
                forecastDays(data.list)
    
            });
    
    };

// similar to current day, pull data 
function forecastDays(weather) {
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();

    //target and declare by variable representation, the container in html that the forecast cards will upload dynamically
    var forecastContainer = document.getElementById("forecastCard")
    //clear old city forecast results so new city forecast results can display
    forecastContainer.innerHTML = '';
    //iterate or 4 loop thru the wather arry (data.list(array))
    for (let i = 0; i < weather.length; i++) {
        //First filters through all of the data and returns only data that falls between ond day after the current data and up to 5 days later.
        if(weather[i].dt >= startDt && weather[i].dt < endDt) {
        if (weather[i].dt_txt.slice(11, 13) == "12") {
            //to distinguish from the array, rename object of weather [i] to forecast - needs to be let and not const becasuse values are changed
            // for each data propery being pulled form api
            let forecast = weather[i];

            //pulling data creating variables
            var icon = `https:://openforecastmap.org/img/w/${forecast.weather[0].icon.png}`;
            var iconAlt = forecast.weather[0].description;
            var temp = forecast.main.temp;
            var humidity =forecast.main.humidity;
            var wind = forecast.wind.speed;
            
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
}
//pull data form weathe api. create card for current day, display
function currentDay(city, weather) {
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
    cardbody.setAttribute("class", "card-body")
    //append cardbody to card (it goes inside the card "wrapper")
    card.append(cardbody)

    //create the elements for the cardbody

    var title = document.createElement("h3")
    var tempEl = document.createElement("p")
    var humidityEl = document.createElement("p")
    var windEl = document.createElement("p")
    var imgIconEl = document.createElement("img")

    //add the attributes like class, src, alt

    title.setAttribute("class", "h3 card-title")
    tempEl.setAttribute("class", "card-text")
    humidityEl.setAttribute("class", "card-text")
    windEl.setAttribute("class", "card-text")
// to the elements, display all text using template literals to hardcode text and pass thru the data to display text
    title.textContent = `${city} ${date}`;
    tempEl.textContent = `Temp: ${temp}`
    humidityEl.textContent = `Humidity: ${humidity}`
    windEl.textContent = `Wind: ${wind}`
    //icon image
    imgIconEl.setAttribute("src", icon)
    imgIconEl.setAttribute("class", "altIcon")
    //loading all 'elements into the cardbody of the card
    cardbody.append(title, imgIconEl, tempEl, windEl, humidityEl)

   
    //have to clear the conatiner in order for the new city weather can be displayed, or new search just adds onto old search results.
    //this clears the html
    todayContainer.innerHTML = '';
    
    //loading card created onto the DOM/HTTML dynamically
    todayContainer.append(card)
}

//HISTORY FUNC


//take array and iterate thru to display dynamically, creating button element
function displayCityArray() {
    //clear the input so that it does not repeat city, duplicate listing in real time, also getting from local storage and displaying
    historyBtn.innerHTML = '';
    //create for loop to iterate or process thru entinre array/ all indexes
    for (let i = 0; i < cityDataArray.length; i++) {
        //create button 
        var btnEL = document.createElement("button")
        btnEL.setAttribute("type", "button")
        btnEL.setAttribute("class", "history-btn")
        btnEL.setAttribute("data-search", cityDataArray[i])
        btnEL.textContent = cityDataArray[i]
        historyBtn.append(btnEL)
    }

}

//send input of city to local storage
function cityHistory(city) {
    console.log(city)
    //if there is no search term return the funciton, -1 means that if there is '0', then the -1 takes an array 'value'away
    //so that if there is 'nothing', not a number value or index value
    if (cityDataArray.indexOf(city) !== -1){
        return;
    }
    cityDataArray.push(city)

    //send to local storage
    localStorage.setItem("cityData", JSON.stringify(cityDataArray))
    //iterating / 4loop the array to create buttons to display
    displayCityArray()

}


//getting array from location storage
function getCityArray() {
    var storedCity = localStorage.getItem('cityData')
    //if true, something is there, then continue...
    if (storedCity) {
        cityDataArray = JSON.parse(storedCity)
    }
    //iterating / 4loop the array to create buttons to display
    displayCityArray()
}


//validate that the button clicked matches the class related to the button created from displayCityArray()
function cityHistoryHandler(e) {
    // conditional if it doesnt match it wont return
    if (!e.target.matches(".history-btn")) {
        return
    }
    var btn = e.target
    var selectedCity = btn.getattribute("data-search")
    //much like search input, next step is going to get city coords of geo api, much like "getting the flow of execution back on track
    //without having to write extra code, reuse the code already written to find city coords"

    getApi(selectedCity)
}
//APP STARTS WITH THIS EVENT HANDLER
//This is where the ap starts, with an entry into box,then button is 'clicked' , event listener anonymous function that
//validates the input box value
formButton.addEventListener("click", function (event) {
    event.preventDefault()
    var selectedCity = cityInput.value;
    console.log(selectedCity)
    getApi(selectedCity)
})

//OTHER EVENT HANMDLERS AND DIRECT FUNCTION CALL OUT
//Buttons are in div container, make entire container an event

historyBtn.addEventListener("click", cityHistoryHandler)

//invoke funciton to render persistent data independently
  
   getCityArray()

