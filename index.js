var locations = JSON.parse(localStorage.getItem("locationInput")) || [];

// making the ajax call to Open Weather to query two different APIs
function ajaxCall(forecastLocation) {
  var query5D =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    forecastLocation +
    "&appid=3277741fcbafb61def09de3fc5eb0344";
    
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    forecastLocation +
    "&appid=3277741fcbafb61def09de3fc5eb0344";

    // a get request that sa1ys append the query reult to my specified div
    // querying for particular parameters, see Open Weather API documentation
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#currentData").empty();
    var cityEl = $("<h2>").addClass("card-title");
    var temperatureEl = $("<h5>");
    var humidityEl = $("<h5>");
    var windSpeedEl = $("<h5>");
    var row = $("<div>").attr("class", "row");

    
    var date = new Date(response.dt * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();


    var dateDisplay = month + "/" + day + "/" + year;
    var city = response.name;
    var fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;


    cityEl.text(city + " " + dateDisplay);
    temperatureEl.text("Temperature: " + fahrenheit + " \xB0F");
    humidityEl.text("Humidity: " + humidity + " %");
    windSpeedEl.text("Wind Speed: " + windSpeed + " MPH");

    var forecastIcon = response.weather[0].icon;
    var forecastIconSrc = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    var iconImg = $("<img>").attr({
      src: forecastIconSrc, alt: "Forcast Icon",
    });

    $("#currentData").append(row);
    row.append(cityEl, iconImg);
    row.after(temperatureEl);
    temperatureEl.after(humidityEl);
    humidityEl.after(windSpeedEl);
// query of the 5 Day Weather API  
    $.ajax({
      url: query5D,
      method: "GET",

// put the response in this div 
    }).then(function (forecastResults) {
      $("#forecast5Day").empty();
      var title = $("<h3>").addClass("card-title");
      title.text("5 Day Forecast");
      $("#forecast5Day").prepend(title);
      var dateRow = $("<div>").addClass("row date-row");
      title.after(dateRow);

      for (var i = 6; i <= 39; i = i + 8) {
        var a = new Date(forecastResults.list[i].dt * 1000);
        var yearForecast = a.getFullYear();
        var monthForecast = a.getMonth() + 1;
        var dayForecast = a.getDate();

        // Temperature conversion
        var forecastTemperature = (
          (forecastResults.list[i].main.temp - 273.15) * 1.8 +
          32
          
        ).toFixed(1);
        var forecastHumidity = forecastResults.list[i].main.humidity;
        var forecastIconForecast = forecastResults.list[i].weather[0].icon;
        var forecastIconSrcForecast =
          "http://openweathermap.org/img/w/" + forecastIconForecast + ".png";
        var forecastDate =
          monthForecast + "/" + dayForecast + "/" + yearForecast;
        var cardDiv = $("<div>").addClass(
          "card bg-primary date lg-col-2 med-col-4 sm-col-6"
        );
        var forecastDateEl = $("<h5>").addClass("card-title");
        var iconImgForecast = $("<img>").attr({
          src: forecastIconSrcForecast,
          alt: "Weather icon",

          
        });
        var forecastTemperatureEl = $("<p>").addClass("text5day");
        var forecastHumidityEl = $("<p>").addClass("text5day");
        cardDiv.append(
          forecastDateEl,
          iconImgForecast,
          forecastTemperatureEl,
          forecastHumidityEl
        );
        $(".date-row").append(cardDiv);
        forecastDateEl.text(forecastDate);
        forecastTemperatureEl.text("Temp: " + forecastTemperature + " \xB0F");
        forecastHumidityEl.text("Humidity: " + forecastHumidity + " %");
      }
    });
  });
}

function locationsResult() {
  $(".forecast-list").empty();
  for (var i = 0; i < locations.length; i++) {
    locationsEl = locations.join();
    var locationsItemEl = $("<li>").addClass("forecast-list-item");
    locationsItemEl.text(locations[i]);
    $(".forecast-list").prepend(locationsItemEl);
  }
}

$(".fa-search").on("click", function (event) {
  event.preventDefault();
  $(".date-row").empty();
  forecastLocation = $(".form-control").val();
  if (locations.indexOf(forecastLocation) === -1) {
    locations.push(forecastLocation);
    localStorage.setItem("locationInput", JSON.stringify(locations));
  }
  locationsResult();
  ajaxCall(forecastLocation);
});
