import { useEffect, useState } from "react";

import weatherService from "../services/countries.js";

const CountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const { name, capital, area, languages, flags } = country;

  useEffect(() => {
    weatherService.getWeatherInfo(name.common).then((returnedResponse) => {
      setWeatherInfo(returnedResponse);
    });
  }, [name.common]);

  return (
    <div>
      <h1>{name.common}</h1>
      <li>capital {capital[0]}</li>
      <li>area {area}</li>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h3>Weather in {capital[0]}</h3>
      {weatherInfo ? (
        <>
          <li>
            temperature {(weatherInfo.main.temp - 273.15).toFixed(2)} Celcius
          </li>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
            alt={weatherInfo.weather[0].description}
          />
          <li>wind {weatherInfo.wind.speed} m/s</li>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default CountryInfo;
