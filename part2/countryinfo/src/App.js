import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all?${countries}`)
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  },[countries])

  const handleSearch = (event) => {
    setCountries(event.target.value)
  }

  return (
    <div className="App">
      <div>
        find countries <input value={countries} onChange={handleSearch} />
      </div>
    </div>
  );
}

export default App;
