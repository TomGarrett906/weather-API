console.log('Open Weather Api');

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
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function getData(city) {
    const apiKey = '66782ce4e0e139b86d87a0a60beebd12'
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

    const celcius = data.main.temp - 273.15;
    const fahrenheit = (celcius * 9/5) + 32;

    hiTemp.textContent = `High: ${fahrenheit.toFixed(1)}°F`;
    loTemp.textContent = `Low: ${fahrenheit.toFixed(1)}°F`;
    forecast.textContent = `Forecast: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // if (data.weather[0].main === "Clear") {
    //   bgImage.style.backgroundImage = url("./static/images/sunny.jpeg");
    // } else if (data.weather[0].main === "Rain") {
    //   bgImage.style.backgroundImage = url("./static/images/rainy.jpeg");
    // } else if (data.weather[0].main === "Fog") {
    //   bgImage.style.backgroundImage = url("./static/images/foggy.jpeg");
    // } else if (data.weather[0].main === "Snow") {
    //   bgImage.style.backgroundImage = url("./static/images/snow.jpeg");
    // } else {
    //   bgImage.style.backgroundImage = url("./static/images/cloud.jpeg");
    // }


    bgImage.style.display = 'block';
  }
});