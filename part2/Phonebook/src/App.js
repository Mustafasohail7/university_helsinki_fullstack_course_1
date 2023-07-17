import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const personArray = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const [persons, setPersons] = useState(personArray) 
  const [filteredPersons, setFilteredPersons] = useState(personArray)
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