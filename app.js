const iconsElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//APP CONSTS AND VARS
const KELVIN = 273;
const key = "1c7f6db206d7ed7e9c42af52d99ec972"

//CHECK IF BROSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does not Support Geolocation</p>";
}

//SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

//GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
//console.log(api);
   
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

//DISPLAY WEATHER TO UI
function displayWeather() {
    iconsElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}º<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

//C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}º<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}º<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

var networkDataReceived = false;
// fetch fresh data
var networkUpdate = fetch('/data.json').then(function(response) {
  return response;
}).then(function(data) {
  networkDataReceived = true;
  updatePage(data);
});

// fetch cached data
caches.match('/data.json').then(function(response) {
  if (!response) throw Error("No data");
  return response;
}).then(function(data) {
  // don't overwrite newer network data
  if (!networkDataReceived) {
    updatePage(data);
  }
}).catch(function() {
  // we didn't get cached data, the network is our last hope:
  return networkUpdate;
});


if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration Failed!");
        console.log(error);
    });
}


