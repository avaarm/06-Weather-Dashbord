var locations = JSON.parse(localStorage.getItem("locationInput")) || [];
var locationsEl = $("forecast-list");

function ajaxCall(forecastLocation) {
  var query5D =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    forecastLocation +
    "&appid=process.env.WeatherAPI_Key";
    
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    forecastLocation +
    "&appid=process.env.WeatherAPI_Key";

  $.ajax({
    url: queryURL,
    method: "GET",

  }).then(function (response) {
    $("#currentData").empty();
    var cityEl = $("<h2>").addClass("card-title");
    var temperatureEl = $("<h5>");
    var humidityEl = $("<h5>");
    var windSpeedEl = $("<h5>");
    var currentRow = $("<div>").attr("class", "row");

    var day = date.getDate();
    var date = new Date(response.dt * 1000);
    var date = month + "/" + day + "/" + year;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    var humidityLevel = response.main.humidity;
    var city = response.name;
    var speedWind = response.wind.speed;
    var fahrenheit = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);

    cityEl.text(city + " " + date);
    temperatureEl.text("Temperature: " + fahrenheit + " \xB0F");
    humidityEl.text("Humidity: " + humidityLevel + " %");
    windSpeedEl.text("Wind Speed: " + speedWind + " MPH");

    var weatherIcon = response.weather[0].icon;
    var iconSource = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
    var iconImg = $("<img>").attr({
      alt: "Weather icon",
      src: iconSource,
      
    });

    $("#currentData").append(currentRow);
    currentRow.append(cityEl, iconImg);
    humidityEl.after(windSpeedEl);
    temperatureEl.after(humidityEl);
    currentRow.after(temperatureEl);
   

    $.ajax({
      url: query5D,
      method: "GET",
    }).then(function (responseForecast) {
      $("#forecast5Day").empty();
      var title = $("<h3>").addClass("card-title");
      title.text("5 Day Forecast");
      $("#forecast5Day").prepend(title);
      var dateRow = $("<div>").addClass("row date-row");
      title.after(dateRow);

      for (var i = 6; i <= 39; i = i + 8) {
        var a = new Date(responseForecast.list[i].dt * 1000);
        var dayForecast = a.getDate();
        var monthForecast = a.getMonth() + 1;
        var yearForecast = a.getFullYear();
        var tempForecast = (
          (responseForecast.list[i].main.temp - 273.15) * 1.8 +
          32
        ).toFixed(1);
        var humidityForecast = responseForecast.list[i].main.humidity;
        var weatherIconForecast = responseForecast.list[i].weather[0].icon;
        var iconSourceForecast =
          "http://openweathermap.org/img/w/" + weatherIconForecast + ".png";
        var dateForecast =
          monthForecast + "/" + dayForecast + "/" + yearForecast;
        var cardDiv = $("<div>").addClass(
          "card bg-primary date lg-col-2 med-col-4 sm-col-6"
        );
        var dateForecastEl = $("<h5>").addClass("card-title");
        var iconImgForecast = $("<img>").attr({
          src: iconSourceForecast,
          alt: "Weather icon",
        });
        var tempForecastEl = $("<p>").addClass("text5day");
        var humidityForecastEl = $("<p>").addClass("text5day");
        cardDiv.append(
          dateForecastEl,
          iconImgForecast,
          tempForecastEl,
          humidityForecastEl
        );
        $(".date-row").append(cardDiv);
        dateForecastEl.text(dateForecast);
        tempForecastEl.text("Temp: " + tempForecast + " \xB0F");
        humidityForecastEl.text("Humidity: " + humidityForecast + " %");
      }
    });
  });
}

function renderlocations() {
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
  renderlocations();
  ajaxCall(forecastLocation);

$(".forecast-list").on("click", "li", function (event) {
  event.preventDefault();
  $(".date-row").empty();
  ajaxCall($(this).text());
});


});
