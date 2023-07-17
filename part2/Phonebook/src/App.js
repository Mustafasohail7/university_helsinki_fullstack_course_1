import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if(searchText === '') {
      setFilteredPersons(persons)
      return
    }
    const afterSearch = persons.filter(person => person.name.toLowerCase().startsWith(searchText.toLowerCase()))
    setFilteredPersons(afterSearch)
  },[searchText,persons])

  const fetchData = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }

  useEffect(fetchData,[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const hanldeSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
    const nameExists = persons.some(person => person.name === personObject.name)
    if (nameExists) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setFilteredPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm hanldeSubmit={hanldeSubmit} newName={newName} handleNameChange={handleNameChange} number={number} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App