const Countries = ({
  countries,
  countryInfo,
  setCountryInfo,
  showInfo,
  setShowInfo,
  getWeatherInformation,
}) => {
  const countriesContentHandler = (countriesList) => {
    if (countriesList.length == 1)
      return (
        <div>
          {getCountryInformation(countriesList[0])}
          {getWeatherInformation(countriesList[0])}
        </div>
      );
    else if (countriesList.length <= 10)
      return countriesList.map((country, index) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}{" "}
            <button onClick={() => setCountryInformation(country, index)}>
              {!showInfo[index] ? "show" : "hide"}
            </button>
          </p>
          <div>{countryInfo[index]}</div>
        </div>
      ));
    else return <p>Too many matches, specify another filter</p>;
  };

  const getCountryInformation = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {Object.entries(country.languages).map(([languageKey, language]) => (
            <li key={languageKey}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt="Country Flag" />
      </div>
    );
  };

  const setCountryInformation = (country, index) => {
    let countryInfo_copy = [...countryInfo];
    let showInfo_copy = [...showInfo];

    if (!showInfo[index])
      countryInfo_copy[index] = getCountryInformation(country);
    else countryInfo_copy[index] = undefined;

    showInfo_copy[index] = !showInfo_copy[index];

    setShowInfo(showInfo_copy);
    setCountryInfo(countryInfo_copy);
  };

  return <>{countriesContentHandler(countries)}</>;
};

export default Countries;
