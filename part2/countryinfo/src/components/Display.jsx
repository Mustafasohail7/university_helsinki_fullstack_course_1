const Display = ({countries,setCountries}) => {

    const handleClick = (country) => {
        setCountries([country])
    }

    if (countries.length === 0) {
        return null;
    } else if (countries.length > 10) {
        return `Too many matches, specify another filter`;
    } else if (countries.length > 1 && countries.length <= 10) {
        return countries.map((country,index) => (
        <li key={index}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></li>
        ));
    } else if (countries.length === 1) {
        let country = countries[0];
        return (
          <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>
              <b>languages:</b>
            </p>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <h2>Weather in {country.capital}</h2>
          </div>
        );
    }
}

export default Display
