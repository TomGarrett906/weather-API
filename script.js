console.log('Open Weather Api');

const body = document.body
console.log(body)
body.style.backgroundImage = "url('./static/images/cloud.jpeg')"

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weather-form');
  const bgImage = document.getElementById('bgImage'); 

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityInput = document.getElementById('city');
    const city = cityInput.value;

    try {
      const data = await getData(city);
      console.log(data);
      getWeather(data);
      changeBG(data);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function getData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error('Bad request');
    }
  }

  function getWeather(data) {
    const hiTemp = document.getElementById('hiTemp');
    const loTemp = document.getElementById('loTemp');
    const forecast = document.getElementById('forecast');
    const humidity = document.getElementById('humidity');
  
    const highCelcius = data.main.temp_max - 273.15;
    const lowCelcius = data.main.temp_min - 273.15;
  
    const highFahrenheit = (highCelcius * 9/5) + 32;
    const lowFahrenheit = (lowCelcius * 9/5) + 32;
  
    hiTemp.textContent = `High: ${highFahrenheit.toFixed(1)}°F`;
    loTemp.textContent = `Low: ${lowFahrenheit.toFixed(1)}°F`;
    forecast.textContent = `Forecast: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  
    bgImage.style.display = 'block';
  }
});