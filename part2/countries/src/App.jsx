import { useEffect, useState } from "react";
import countryService from "./services/countries.js";
import Display from "./components/Display.jsx";
import CountryInfo from "./components/CountryInfo.jsx";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((returnedResponse) => {
      setCountries(returnedResponse);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries =
    countries.length > 0
      ? countries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      : [];

  return (
    <div>
      <div>
        find countries <input onChange={handleSearch} />
      </div>
      {filteredCountries.length === 0 ? (
        <p>No country found</p>
      ) : (
        <>
          <Display countries={filteredCountries} handleShow={handleShow} />
          {selectedCountry && <CountryInfo country={selectedCountry} />}
        </>
      )}
    </div>
  );
};

export default App;
