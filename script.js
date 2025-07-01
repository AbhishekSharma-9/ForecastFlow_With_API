const apiKey = "HAHA! Won't Give you My API Key";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from API:", response.status, errorText);
      alert("Error fetching weather data. Please check the city name or try again.");
      return;
    }

    const data = await response.json();

    // Extract relevant data
    const weather = data.current;
    const location = data.location;

    document.getElementById("cityName").textContent = `${location.name}, ${location.country}`;
    document.getElementById("description").textContent = weather.condition.text;
    document.getElementById("temperature").textContent = `🌡️ ${weather.temp_c} °C`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${weather.humidity}%`;
    document.getElementById("wind").textContent = `🌬️ Wind Speed: ${weather.wind_kph} kph`;
    document.getElementById("weatherIcon").src = `https:${weather.condition.icon}`;

    document.getElementById("weatherInfo").style.display = "block";
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Network error. Please try again.");
  }
}
