import { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({countries,setCountries,lat,long,setLat,setLong}) => {

    const [weather,setWeather] = useState({})

    // useEffect(() => {
    //         axios
    //         .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
    //         .then(response => {
    //         setWeather(response.data)
    //         })
    //   },[lat,long,setCountries])

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
        setLat(country.capitalInfo.latlng[0])
        setLong(country.capitalInfo.latlng[1])
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
            <p>{country.capitalInfo.latlng[0]}</p>
            <p>{country.capitalInfo.latlng[1]}</p>
          </div>
        );
    }
}

export default Display
