let where = 0;
let myweather = (weathercont) => {
  if (where == 1) {
    let name = weathercont.location.name;
    let icon = weathercont.current.condition.icon;
    let description = weathercont.current.condition.text;
    let temp = weathercont.current.temp_c;
    let humidity = weathercont.current.humidity;
    let speed = weathercont.current.wind_kph;
    document.querySelector("#hdcity").innerHTML = " Home Weather " + name;
    document.querySelector("#hdicon").src = "https:" + icon;
    console.log('"' + "https:" + icon + '"');
    document.querySelector("#hddescription").innerText = description;
    document.querySelector("#hdtemp").innerText = temp + "°C";
    document.querySelector("#hdhumidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector("#hdwind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector("#hdweather").style.display = "none";
  }
  if (where == 2) {
    let name = weathercont.location.country;
    let icon = weathercont.current.condition.icon;
    let description = weathercont.current.condition.text;
    let temp = weathercont.current.temp_c;
    let humidity = weathercont.current.humidity;
    let speed = weathercont.current.wind_kph;
    document.querySelector("#city").innerHTML = "Weather in " + name;
    document.querySelector("#icon").src = "https:" + icon;
    console.log('"' + "https:" + icon + '"');
    document.querySelector("#description").innerText = description;
    document.querySelector("#temp").innerText = temp + "°C";
    document.querySelector("#humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector("#wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector("#weather").style.display = "none";
  }
};

let mcli = async (location) => {
  await fetch(
    "https://api.weatherapi.com/v1/current.json?key=bab35c530325422da7480924232907&q=" +
      location +
      "&aqi=no"
  )
    .then((resp) => {
      if (!resp.ok) {
        alert("check the country name or yourconection");
        throw new Error("Network response was not ok");
      } else {
        return resp.json();
      }
    })
    .then((weather) => {
      let weathercont = weather;
      console.log(weathercont);
      myweather(weathercont);
    });
};

let srh = () => {
  let count = document.querySelector(".search-bar").value;
  if (count) {
    mcli(count);
    where = 2;
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  srh();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let posi = lat + "," + lon;
  console.log(posi);
  mcli(posi);
  where = 1;
}
getLocation();
