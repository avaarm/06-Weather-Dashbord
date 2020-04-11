

// // API call: 5 Day/ 3 hour forecast data
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=3277741fcbafb61def09de3fc5eb0344"




// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {

//       // Log the queryURL
//       console.log(queryURL);

//       // Log the resulting object
//       console.log(response);

//       // Transfer content to HTML
//       $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//       $(".wind").text("Wind Speed: " + response.wind.speed);
//       $(".humidity").text("Humidity: " + response.main.humidity);
      
//       // Convert the temp to fahrenheit
//       var tempF = (response.main.temp - 273.15) * 1.80 + 32;

//       // add temp content to html
//       $(".temp").text("Temperature (K) " + response.main.temp);
//       $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

//       // Log the data in the console as well
//       console.log("Wind Speed: " + response.wind.speed);
//       console.log("Humidity: " + response.main.humidity);
//       console.log("Temperature (F): " + tempF);
//     });




    // This is my API key
    
    var APIKey = "3277741fcbafb61def09de3fc5eb0344";
    var locations = ["Austin", "Chicago", "New York", "Orlando"];

    // Here we are building the URL we need to query the database
    function displayWeatherInfo() {

        var location = $(this).attr('data-name');
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=3277741fcbafb61def09de3fc5eb0344"
       // Log the queryURL
        console.log(queryURL);
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
        
         
        
        // Log the resulting object
        console.log(response); 
        })
    }