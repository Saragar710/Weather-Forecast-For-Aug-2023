.then(function (data) {
    var uniqueForecastDate = [];
    return data.list.filter(forecast => {
        var forecastDate = new Date(forecast.dt_text).getDate();
        if (!uniqueForecastDate.includes(forecastDate)) {
            uniqueForecastDate.push(forecast);
            return true;
        }
        return false;
    });
    // .catch(function(error) {
    //     console.log(error);
    // });

})
.then(function (fiveDayForecast) {
    cityInput.value = "";
    currentWeatherDiv.innerHTML = "";
    weatherCardsDiv.innerHTML = "";

    console.log(fiveDayForecast.lat.lon);
    fiveDayForecast.forEach((weatherItem, index) => {
        // if(index === 0) {
        // weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

        // } else{

        weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
        //}

    });


}
});


// var createWeatherCard = (cityName, weatherItem, index) => {
//     if (index === 0) {
//         return `   <div class="details">
//         <h3>${cityName}(${weatherItem.dt_txt.split(" ")[0]})</h3>
//         <h4>Temperature:${weatherItem.main.temp}</h4>
//         <h4>Wind Speed: ${weatherItem.wind.speed}mph</h4>
//         <h4>Humidity:${weatherItem.main.humidity} %</h4>
//       </div>
//       <div class="icon">
//       <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon} /@2x.png" alt="weather-icon">
//       <h4>${weatherItem.weather[0].description}</h4>
//     </div>`;


//     } else {
//         return `<li class="weather-cards">
//            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
//            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}2x.png" alt="weather-icon">"
//            <h4>Temperature: ${weatherItem.main.temp}</h4>
//            <h4>Wind Speed: ${weatherItem.wind.speed}mph</h4>
//            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//     </li>`;
//     }
// }
//css
#forecastCard {
    width: 25%;
    margin: 10px 0 10px 0;
    padding: 10px 10px;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: space-around;
}

/* .altIcon {
    min-height: 50px;
    max-height: 50px;
} */
/* .weather-cards {
    display: flex;
     gap: 15px;
}
.weather-cards .card {
    /* list-style: none; */
    /* background:  grey;
    color: white;
    padding: 15px 15px ;
    border-radius: 5px;
    width: 5%;
    /* flex-direction: column; */
/* }
