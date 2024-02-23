const cityName = document.querySelector("#inputCity");
const headlineBox = document.querySelector(".headline-box");
const middleBox = document.querySelector(".middle-box");
const lowerBox = document.querySelector(".lower-box");
const forecastBox = document.querySelector(".forecast-box");
const firstDayBox = document.querySelector(".first-day");
const secondDayBox = document.querySelector(".second-day");
const thirdDayBox = document.querySelector(".third-day");
const fourthDayBox = document.querySelector(".fourth-day");
const fifthDayBox = document.querySelector(".fifth-day");

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
            lowerBox.innerHTML = "";
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
              })
              .catch((err) =>
                console.error("Error loading current Time/Data-API", err)
              );
            // ! middleBox !
            // Temperature
            let temperature = document.createElement("h2");
            let temperatureRounded = Math.round(weatherData.main.temp);
            temperature.textContent = `${temperatureRounded}°C`;
            middleBox.appendChild(temperature);
            // Emoji Function
            let weatherIconHtml = document.createElement("img");
            middleBox.appendChild(weatherIconHtml);
            weatherIconHtml.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            // Description
            let description = document.createElement("h5");
            let descriptionWeather = weatherData.weather[0].description;
            description.textContent = descriptionWeather;
            middleBox.appendChild(description);
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
            // ! lowerBox !
            // Sunrise
            let sunrise = document.createElement("p");
            let sunriseOutput = new Date(
              (weatherData.sys.sunrise + weatherData.timezone) * 1000
            );
            let sunriseHours = sunriseOutput.getHours();
            sunriseHours -= 1;
            let sunriseMinutes = sunriseOutput.getMinutes();
            sunrise.textContent = `🌅 Sunrise: ${sunriseHours}:${sunriseMinutes} `;
            lowerBox.appendChild(sunrise);
            // Sunset
            let sunset = document.createElement("p");
            let sunsetOutput = new Date(
              (weatherData.sys.sunset + weatherData.timezone) * 1000
            );
            let sunsetHours = sunsetOutput.getHours();
            sunsetHours -= 1;
            let sunsetMinutes = sunsetOutput.getMinutes();
            sunset.textContent = `🌇 Sunset: ${sunsetHours}:${sunsetMinutes} `;
            lowerBox.appendChild(sunset);
            // Pressure
            let pressure = document.createElement("p");
            let pressureOutput = weatherData.main.pressure;
            pressure.textContent = `💨 Pressure: ${pressureOutput} hPa`;
            lowerBox.appendChild(pressure);
            // Humidity
            let humidity = document.createElement("p");
            let humidityOutput = weatherData.main.humidity;
            humidity.textContent = `💧 Humidity: ${humidityOutput} %`;
            lowerBox.appendChild(humidity);
            // Wind Speed
            let wind = document.createElement("p");
            let windOutput = weatherData.wind.speed;
            wind.textContent = `🌬️ Wind speed: ${windOutput} m/s`;
            lowerBox.appendChild(wind);
            // Cloudiness
            let clouds = document.createElement("p");
            let cloudsOutput = weatherData.clouds.all;
            clouds.textContent = `☁️ Cloudiness: ${cloudsOutput} %`;
            lowerBox.appendChild(clouds);
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=fe27144da2058b8443d8d23a65412380`
            )
              .then((res) => res.json())
              .then((forecastData) => {
                console.log(forecastData);
                //    ! Day 1 !
                // Day 1 - Date
                let outputDateDay1 = document.createElement("p");
                let dateDay1 = new Date(forecastData.list[7].dt_txt);
                let dateDay1New = dateDay1.toLocaleString("default", {
                  weekday: "short",
                });
                outputDateDay1.textContent = dateDay1New;
                firstDayBox.appendChild(outputDateDay1);
                // Day 1 - Description
                let outputDescriptionDay1 = document.createElement("p");
                let descriptionDay1 =
                  forecastData.list[7].weather[0].description;
                outputDescriptionDay1.textContent = descriptionDay1;
                firstDayBox.appendChild(outputDescriptionDay1);
                // Day 1 - Icon
                let forecastIconDay1 = document.createElement("img");
                firstDayBox.appendChild(forecastIconDay1);
                forecastIconDay1.src = `https://openweathermap.org/img/wn/${forecastData.list[7].weather[0].icon}@2x.png`;
                // Day 1 - Temperature
                let outputTemperatureDay1 = document.createElement("p");
                let temperatureDay1 = forecastData.list[7].main.temp;
                let temperatureDay1Now = Math.round(temperatureDay1);
                outputTemperatureDay1.textContent = `${temperatureDay1Now}°C `;
                firstDayBox.appendChild(outputTemperatureDay1);
                //    ! Day 2 !
                // Day 2 - Date
                let outputDateDay2 = document.createElement("p");
                let dateDay2 = new Date(forecastData.list[15].dt_txt);
                let dateDay2New = dateDay2.toLocaleString("default", {
                  weekday: "short",
                });
                outputDateDay2.textContent = dateDay2New;
                secondDayBox.appendChild(outputDateDay2);
                // Day 2 - Description
                let outputDescriptionDay2 = document.createElement("p");
                let descriptionDay2 =
                  forecastData.list[15].weather[0].description;
                outputDescriptionDay2.textContent = descriptionDay2;
                secondDayBox.appendChild(outputDescriptionDay2);
                // Day 2 - Icon
                let forecastIconDay2 = document.createElement("img");
                secondDayBox.appendChild(forecastIconDay2);
                forecastIconDay2.src = `https://openweathermap.org/img/wn/${forecastData.list[15].weather[0].icon}@2x.png`;
                // Day 2 - Temperature
                let outputTemperatureDay2 = document.createElement("p");
                let temperatureDay2 = forecastData.list[15].main.temp;
                let temperatureDay2Now = Math.round(temperatureDay2);
                outputTemperatureDay2.textContent = `${temperatureDay2Now}°C `;
                secondDayBox.appendChild(outputTemperatureDay2);
                //    ! Day 3 !
                // Day 3 - Date
                let outputDateDay3 = document.createElement("p");
                let dateDay3 = new Date(forecastData.list[23].dt_txt);
                let dateDay3New = dateDay3.toLocaleString("default", {
                  weekday: "short",
                });
                outputDateDay3.textContent = dateDay3New;
                thirdDayBox.appendChild(outputDateDay3);
                // Day 3 - Description
                let outputDescriptionDay3 = document.createElement("p");
                let descriptionDay3 =
                  forecastData.list[23].weather[0].description;
                outputDescriptionDay3.textContent = descriptionDay3;
                thirdDayBox.appendChild(outputDescriptionDay3);
                // Day 3 - Icon
                let forecastIconDay3 = document.createElement("img");
                thirdDayBox.appendChild(forecastIconDay3);
                forecastIconDay3.src = `https://openweathermap.org/img/wn/${forecastData.list[23].weather[0].icon}@2x.png`;
                // Day 3 - Temperature
                let outputTemperatureDay3 = document.createElement("p");
                let temperatureDay3 = forecastData.list[23].main.temp;
                let temperatureDay3Now = Math.round(temperatureDay3);
                outputTemperatureDay3.textContent = `${temperatureDay3Now}°C `;
                thirdDayBox.appendChild(outputTemperatureDay3);
                //    ! Day 4 !
                // Day 4 - Date
                let outputDateDay4 = document.createElement("p");
                let dateDay4 = new Date(forecastData.list[31].dt_txt);
                let dateDay4New = dateDay4.toLocaleString("default", {
                  weekday: "short",
                });
                outputDateDay4.textContent = dateDay4New;
                fourthDayBox.appendChild(outputDateDay4);
                // Day 4 - Description
                let outputDescriptionDay4 = document.createElement("p");
                let descriptionDay4 =
                  forecastData.list[31].weather[0].description;
                outputDescriptionDay4.textContent = descriptionDay4;
                fourthDayBox.appendChild(outputDescriptionDay4);
                // Day 4 - Icon
                let forecastIconDay4 = document.createElement("img");
                fourthDayBox.appendChild(forecastIconDay4);
                forecastIconDay4.src = `https://openweathermap.org/img/wn/${forecastData.list[31].weather[0].icon}@2x.png`;
                // Day 4 - Temperature
                let outputTemperatureDay4 = document.createElement("p");
                let temperatureDay4 = forecastData.list[31].main.temp;
                let temperatureDay4Now = Math.round(temperatureDay4);
                outputTemperatureDay4.textContent = `${temperatureDay4Now}°C `;
                fourthDayBox.appendChild(outputTemperatureDay4);
                //    ! Day 5 !
                // Day 5 - Date
                let outputDateDay5 = document.createElement("p");
                let dateDay5 = new Date(forecastData.list[39].dt_txt);
                let dateDay5New = dateDay5.toLocaleString("default", {
                  weekday: "short",
                });
                outputDateDay5.textContent = dateDay5New;
                fifthDayBox.appendChild(outputDateDay5);
                // Day 5 - Description
                let outputDescriptionDay5 = document.createElement("p");
                let descriptionDay5 =
                  forecastData.list[39].weather[0].description;
                outputDescriptionDay5.textContent = descriptionDay5;
                fifthDayBox.appendChild(outputDescriptionDay5);
                // Day 5 - Icon
                let forecastIconDay5 = document.createElement("img");
                fifthDayBox.appendChild(forecastIconDay5);
                forecastIconDay5.src = `https://openweathermap.org/img/wn/${forecastData.list[39].weather[0].icon}@2x.png`;
                // Day 5 - Temperature
                let outputTemperatureDay5 = document.createElement("p");
                let temperatureDay5 = forecastData.list[39].main.temp;
                let temperatureDay5Now = Math.round(temperatureDay5);
                outputTemperatureDay5.textContent = `${temperatureDay5Now}°C `;
                fifthDayBox.appendChild(outputTemperatureDay5);
              });
          })
          .catch((err) =>
            console.error("Error loading current Weather-API", err)
          );
      });
    })
    .catch((err) => console.error("Error loading current Geo-API", err));
};
