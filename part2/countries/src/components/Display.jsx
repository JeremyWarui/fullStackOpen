import CountryInfo from "./CountryInfo";

const Display = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  } else {
    return (
      <div>
        {countries.map((country) => {
          return (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country)}>show</button>{" "}
            </li>
          );
        })}
      </div>
    );
  }
};

export default Display;
