const Weather = ({ weatherData }) => {
  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp} Celsius</p>{" "}
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
