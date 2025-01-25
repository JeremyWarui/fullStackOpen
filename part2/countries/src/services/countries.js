import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY;

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = () => {
  const response = axios.get(baseUrl).then((response) => response.data);
  return response;
};

const getCountryInfo = (countryName) => {
  const response = axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then((response) => response.data);

  return response;
};

const getWeatherInfo = (cityName) => {
  const response = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
    .then((response) => response.data);

  return response;
};

export default { getCountries, getCountryInfo, getWeatherInfo };
