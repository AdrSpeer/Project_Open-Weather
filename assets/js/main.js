const cityName = document.querySelector("#inputCity");
const headlineBox = document.querySelector(".headline-box");
const middleBox = document.querySelector(".middle-box");
const lowerBox = document.querySelector(".lower-box");

const weatherData = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&appid=fe27144da2058b8443d8d23a65412380`
  )
    .then((res) => res.json())
    .then((dataGeo) => {
      dataGeo.forEach((allItems) => {
        let lat = allItems.lat;
        let lon = allItems.lon;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=fe27144da2058b8443d8d23a65412380`
        )
          .then((res) => res.json())
          .then((weatherData) => {
            console.log(weatherData);
            // Clear
            headlineBox.innerHTML = "";
            middleBox.innerHTML = "";
            // ! headlineBox !
            // Location
            let location = document.createElement("h3");
            location.textContent = `Weather in ${weatherData.name}, ${weatherData.sys.country} `;
            headlineBox.appendChild(location);
            // Local Time
            fetch(
              `https://api-bdc.net/data/timezone-by-location?latitude=${lat}&longitude=${lon}&key=bdc_ce788dcf9d4a4df6bce23664876d5ef6`
            )
              .then((res) => res.json())
              .then((timeData) => {
                let time = document.createElement("p");
                let localTime = new Date(timeData.localTime);
                let localTimeNew = localTime.toLocaleTimeString();
                let today = new Date();
                let todayNew = today.toLocaleDateString();
                time.textContent = `Current local time: ${todayNew} ${localTimeNew}`;
                headlineBox.appendChild(time);
              });
            // ! middleBox !
            // Temperature
            let temperature = document.createElement("h2");
            let temperatureRounded = Math.round(weatherData.main.temp);
            temperature.textContent = `${temperatureRounded}°C`;
            middleBox.appendChild(temperature);
            // Temperature feels like
            let temperatureFeels = document.createElement("p");
            let temperatureFeelsRounded = Math.round(
              weatherData.main.feels_like
            );
            temperatureFeels.textContent = `Feels like: ${temperatureFeelsRounded}°C`;
            middleBox.appendChild(temperatureFeels);
            // Temperature Min and Max
            let tempMinMax = document.createElement("p");
            let temMinRounded = Math.round(weatherData.main.temp_min);
            let temMaxRounded = Math.round(weatherData.main.temp_max);
            tempMinMax.textContent = `Max: ${temMaxRounded}°C ↑ Min: ${temMinRounded}°C ↓ `;
            middleBox.appendChild(tempMinMax);
            // Description
            let description = document.createElement("h5");
            let descriptionWeather = weatherData.weather[0].description;
            description.textContent = descriptionWeather;
            middleBox.appendChild(description);
            // ! lowerBox !
            // Wind Speed
            let wind = document.createElement("p");
            let windOutput = weatherData.wind.speed;
            wind.textContent = `Wind speed: ${windOutput} m/s`;
            lowerBox.appendChild(wind);
            // Pressure
            let pressure = document.createElement("p");
            let pressureOutput = weatherData.main.pressure;
            pressure.textContent = `Pressure: ${pressureOutput} hPa`;
            lowerBox.appendChild(pressure);
            // Humidity
            let humidity = document.createElement("p");
            let humidityOutput = weatherData.main.humidity;
            humidity.textContent = `Humidity: ${humidityOutput} %`;
            lowerBox.appendChild(humidity);
            // Cloudiness
            let clouds = document.createElement("p");
            let cloudsOutput = weatherData.clouds.all;
            clouds.textContent = `Cloudiness: ${cloudsOutput} %`;
            lowerBox.appendChild(clouds);
          })
          .catch((err) =>
            console.log("Error loading current Weather-API", err)
          );
      });
    })
    .catch((err) => console.error("Error loading Geo-API", err));
};
