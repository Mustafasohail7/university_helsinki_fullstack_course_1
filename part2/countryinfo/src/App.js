import { useEffect, useState } from 'react'
import axios from 'axios'

import Display from './components/Display'

function App() {

  const [countries, setCountries] = useState([])
  const [filtered,setFiltered] = useState([])
  const [lat,setLat] = useState(0)
  const [long,setLong] = useState(0) 

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
    })
  },[countries])

  const handleChange = (event) => {

    if(event.target.value === ''){
      setFiltered([])
      return
    }
    setFiltered(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      <div>
        find countries <input onChange={handleChange} />
      </div>
      <div>
        <Display countries={filtered} setCountries={setFiltered} lat={lat} long={long} setLat={setLat} setLong={setLong} />
      </div>
    </div>
  );
}

export default App;
