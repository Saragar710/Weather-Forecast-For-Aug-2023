var APIKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";

var cityInput = document.getElementById("city-name");
var formButton = document.querySelector("form button");



function getApi(city){
    console.log(city)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



fetch(queryURL)
.then(function (response){
    return response.json();
})
.then(function (data) {
    console.log(data);
//     for(var i = 0; < data.length; i++){
//        var listItem = document. 
//     }
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
}


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

function getApi(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/hourly?q="lat={lat}&lon={lon}&appid={APIkey}&units=imperial
}

