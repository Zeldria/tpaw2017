// JavaScript source code
window.onload = function () {
    document.getElementById("searchCity").addEventListener("submit", function (event) {
        event.preventDefault(); // pour annuler le rechargement de la page
        var city = document.getElementById("city").value;
        searchCity(city);
    })
}
function searchCity(_city) {
    console.log('searchCity', 'Hello from ' + _city);
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+_city+'&appid=0ada432b59deb9716c357092c5f79be6', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var responseJSON = JSON.parse(request.responseText);
            console.log(responseJSON);

            var date = new Date(responseJSON.sys.sunset * 1000);
            document.getElementById("nom").innerHTML = responseJSON.name;
            document.getElementById("temps").innerHTML = responseJSON.weather[0].description;

            document.getElementById("tim").innerHTML = date.getHours() + ":" + date.getMinutes();
            document.getElementById("temp").innerHTML = (responseJSON.main.temp - 273.15).toFixed(0) + "°";

            document.getElementById("hr").innerHTML = "<hr width='50%'>";
            document.getElementById("hr1").innerHTML = "<hr width='50%'>";
            document.getElementById("hr2").innerHTML = "<hr width='50%'>";
            document.getElementById("hr3").innerHTML = "<hr width='50%'>";
            document.getElementById("hr4").innerHTML = "<hr width='50%'>";
            document.getElementById("hr5").innerHTML = "<hr width='50%'>";


            document.getElementById("humidity").innerHTML = "humidity " + responseJSON.main.humidity + " %";
            document.getElementById("cloud").innerHTML = " Nuage " + responseJSON.clouds.all + " %";
            document.getElementById("wind").innerHTML = "Vent " + responseJSON.wind.speed + " m/s";

            document.getElementById("icon").src = "http://openweathermap.org/img/w/" + responseJSON.weather[0].icon + ".png";
            //VOTRE CODE JS pour afficher les données météo sur

            var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + responseJSON.name + "&zoom=13&size=300x300&maptype=roadmap&markers=" + responseJSON.name + "";

            document.getElementById("map").innerHTML = '<img src="' + img_url + '"/>';
            // en mettant à jour la DIV “result”


        } else {

        }
    };
    request.onerror = function () {
        console.error("erreur");
    };
    request.send();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("nom").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  searchLatLng(position.coords.latitude , position.coords.longitude)
}
function showError(error) {
    var x = document.getElementById("nom");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }

}
function searchLatLng(_lat, _lng) {
    console.log('searchLatLng', 'Hello from' + _lat + ',' + _lng);

    //A compléter dans la suite du TP
    var request = new XMLHttpRequest();
    request.open('GET',
   'http://api.openweathermap.org/data/2.5/weather?lat=' + _lat + '&lon=' + _lng + '&appid=8da60da7fbcb4a533e49dba9b9d82d72', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var responseJSON = JSON.parse(request.responseText);
            console.log(responseJSON);

            var date = new Date(responseJSON.sys.sunset*1000);  

            document.getElementById("nom").innerHTML = responseJSON.name;
            document.getElementById("temps").innerHTML = responseJSON.weather[0].description;

            document.getElementById("tim").innerHTML = date.getHours() +":"+ date.getMinutes();
            document.getElementById("temp").innerHTML = (responseJSON.main.temp - 273.15).toFixed(0) + "°";

            document.getElementById("hr").innerHTML = "<hr width='50%'>";
            document.getElementById("hr1").innerHTML = "<hr width='50%'>";
            document.getElementById("hr2").innerHTML = "<hr width='50%'>";
            document.getElementById("hr3").innerHTML = "<hr width='50%'>";
            document.getElementById("hr4").innerHTML = "<hr width='50%'>";
            document.getElementById("hr5").innerHTML = "<hr width='50%'>";


            document.getElementById("humidity").innerHTML = "humidity " + responseJSON.main.humidity + " %";
            document.getElementById("cloud").innerHTML = " Nuage " + responseJSON.clouds.all + " %";
            document.getElementById("wind").innerHTML = "Vent " + responseJSON.wind.speed + " m/s";

            document.getElementById("icon").src = "http://openweathermap.org/img/w/" + responseJSON.weather[0].icon + ".png";
            //VOTRE CODE JS pour afficher les données météo sur

            var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + responseJSON.name + "&zoom=13&size=300x300&maptype=roadmap&markers=" + responseJSON.name + "";

            document.getElementById("map").innerHTML = '<img src="' + img_url + '"/>';
            // en mettant à jour la DIV “result”

        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();

}