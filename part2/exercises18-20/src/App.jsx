import { useState, useEffect } from "react";

import countryService from "./services/country";
import weatherService from "./services/weather";

import Countries from "./components/Countries";
import Weather from "./components/Weather";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((countryInfoList) => setCountries(countryInfoList));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      weatherService
        .getAll(selectedCountry.capital)
        .then((weatherDataObtained) => setWeatherData(weatherDataObtained));
    }
  }, [selectedCountry]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCountryInfo([]);
    setShowInfo([]);

    const filteredCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    if (filteredCountries.length === 1)
      setSelectedCountry(filteredCountries[0]);
  };

  const getWeatherInformation = () => {
    if (weatherData === null) return;

    return <Weather weatherData={weatherData} />;
  };

  const countriesAfterFilter =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <Countries
        countries={countriesAfterFilter}
        countryInfo={countryInfo}
        setCountryInfo={setCountryInfo}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        getWeatherInformation={getWeatherInformation}
      />
    </>
  );
}

export default App;
