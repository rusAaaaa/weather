const apiKey = "0f5b238380235a5c531d41453eb56f06";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found! Please enter a valid city name.");
      return;
    }

    console.log(data);

    // Отображаем данные на странице
    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Правильное название переменной
    if (data.weather[0].main == "Clouds") {
      WeatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      WeatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      WeatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      WeatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      WeatherIcon.src = "images/mist.png";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Поиск при клике на кнопку
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Загружаем погоду по умолчанию (например, для Киева)
checkWeather("Kyiv");
