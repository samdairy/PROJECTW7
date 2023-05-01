$(document).ready(function() {

    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://api.openweathermap.org/data/2.5/weather?lat="
    document.body.appendChild(script);

    // Get user's current location and display city name
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
            var lat = location.coords.latitude;
            var lon = location.coords.longitude;
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=a301cfc4bfa640bde3d24035478794c3", function(data) {
                $(".city-name").text(data.name);
                initMap(lat, lon);
            });
        });
    }

    // Get weather data for user's current location
    $("#btn-location").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=a301cfc4bfa640bde3d24035478794c3", function(data) {
                    displayWeather(data);
                    initMap(lat, lon);
                });
            });
        }
    });

    // Get weather data for chosen city
    $("#btn-choice").click(function() {
        var city = $("#city-input").val();
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a301cfc4bfa640bde3d24035478794c3", function(data) {
            displayWeather(data);
            initMap(data.coord.lat, data.coord.lon);
        });
    });

    // Display weather data in table
    function displayWeather(data) {
        $("#city-info").text(data.name);
        $("#weather-info").text(data.weather[0].description);
        $("#temp-info").text(((data.main.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F");
        $("#humidity-info").text(data.main.humidity + " %");
        $("#windSpeed-info").text(data.wind.speed + " m/s");
    }

    // Initialize Google Maps with location
    function initMap(latitude, longitude) {
        var mapOptions = {
            center: {lat: latitude, lng: longitude},
            zoom: 8
        };
        
    }

    // Get a reference to the body element
    var body = document.getElementsByTagName("body")[0];

    // Set the background color to blue
    body.style.backgroundColor = "";
});