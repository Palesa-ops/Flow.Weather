const apiKey = "1be08b76d583b20of0a471teb6b021a1";

async function getWeather() {
  let city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  try {
    let response = await axios.get(weatherUrl);
    let weatherData = response.data;

    updateWeatherUI(weatherData);
  } catch (error) {
    alert(
      "Error fetching weather data. Please check the city name and try again."
    );
    console.error("API Error:", error);
  }
}

function updateWeatherUI(data) {
  let cityNameElement = document.getElementById("city-name");
  let tempDiv = document.getElementById("temp-div");
  let weatherInfo = document.getElementById("weather-info");
  let weatherIcon = document.getElementById("weather-icon");
  let windSpeedElement = document.getElementById("wind-speed");

  if (!data || !data.temperature) {
    alert("Invalid weather data received!");
    return;
  }

  let cityName = data.city;
  let temperature = Math.round(data.temperature.current);
  let description = data.condition.description;
  let iconUrl = data.condition.icon_url;
  let windSpeed = data.wind.speed;

  cityNameElement.innerHTML = cityName;
  tempDiv.innerHTML = `<p>${temperature}°C</p>`;
  weatherInfo.innerHTML = `<p>${description.toUpperCase()}</p>`;
  windSpeedElement.innerHTML = `<p>Wind Speed: ${windSpeed} m/s</p>`;

  weatherIcon.src = iconUrl;
  weatherIcon.style.display = "block";
}
