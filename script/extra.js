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


});

