var ApiKey = "7e2c9dd2ce3aec612d1cb1d25cf47214";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function getApi(){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

}

fetch(queryURL)
.then(function (response){
    return response.json();
})
// .then(function (data) {
//     for(var i = 0; < data.length; i++){
//        var listItem = document. 
//     }
// })