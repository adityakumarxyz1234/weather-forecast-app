const apiKey = "bcc2c7123882e7fdd6e8ee0a020ba19a";

function updateDateTime(){

document.getElementById("dateTime").innerText =
new Date().toLocaleString();

}

setInterval(updateDateTime,1000);

updateDateTime();

async function getWeather(){

const city =
document.getElementById("city").value;

if(city==="") return;

fetchWeather(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

}

async function fetchWeather(url){

try{

const response =
await fetch(url);

const data =
await response.json();

updateWeather(data);


}
catch(error){

console.log(error);

}

}

function updateWeather(data){

document.getElementById("cityName").innerText =
data.name;

document.getElementById("temp").innerText =
data.main.temp + "°C";

document.getElementById("description").innerText =
data.weather[0].description;

document.getElementById("humidity").innerText =
data.main.humidity + "%";

document.getElementById("wind").innerText =
data.wind.speed + " km/h";

const weather =
data.weather[0].main;

const iconCode =
data.weather[0].icon;

const icon =
document.getElementById("weatherIcon");

if(weather==="Clouds"){

icon.innerHTML="☁️☁️";

document.body.style.backgroundImage=
"url('images/cloudy.png')";

}

else if(weather==="Rain"){

icon.innerHTML="🌧️🌧️";

document.body.style.backgroundImage=
"url('images/rainy.png')";

}

else if(weather==="Clear"){

if(iconCode.includes("d")){

icon.innerHTML="☀️";

document.body.style.backgroundImage=
"url('images/sunny.png')";

}
else{

icon.innerHTML="🌙🌠";

document.body.style.backgroundImage=
"url('images/night.png')";

}

}

else{

icon.innerHTML="🌤️";

document.body.style.backgroundImage=
"url('images/cloudy.png')";

}

}

async function getForecast(city){

const response =
await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
);

const data =
await response.json();

let html="";

for(let i=0;i<data.list.length;i+=8){

const item =
data.list[i];

const day =
new Date(item.dt_txt)
.toLocaleDateString(
"en-US",
{weekday:"short"}
);

html+=`

<div class="forecast-item">

<p>${day}</p>

<p>${item.main.temp.toFixed(1)}°C</p>

</div>

`;

}

document.getElementById("forecast")
.innerHTML=html;

}

document
.getElementById("city")
.addEventListener("keypress",
function(event){

if(event.key==="Enter"){

getWeather();

}

});

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat=
position.coords.latitude;

const lon=
position.coords.longitude;

fetchWeather(

`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

);

}

);

}

window.onload=
getLocationWeather;